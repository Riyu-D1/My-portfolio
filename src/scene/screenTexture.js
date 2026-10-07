// Dot-matrix CRT screen texture for the device.
// Text is rasterized onto a tiny 64x48 canvas, then every lit pixel is
// redrawn as an LED dot on the 256x192 texture — a real dot-matrix look.
// The render loop calls update(t) every frame; we redraw at ~12fps max
// (phosphor flicker + cursor blink), plus immediately on setMode().

import * as THREE from 'three'

const TW = 256
const TH = 192
const GW = 64
const GH = 48
const PITCH = TW / GW // 4px per dot cell
const DOT_R = 1.8
const ALPHA_MIN = 30 // glyph-pixel alpha threshold to light a dot
const FLICKER = 0.015 // ~1.5% of dots randomly dimmed per redraw
const TICK = 1 / 12 // max redraw rate — ~12fps

// accent elements are drawn in this marker hue in glyph space, then
// re-tinted to the live accent at the dot pass — hue survives the raster
const ACCENT_MARK = '#ff0000'

export function createScreenTexture() {
  // --- texture canvas (what the GPU sees) ---
  const canvas = document.createElement('canvas')
  canvas.width = TW
  canvas.height = TH
  const ctx = canvas.getContext('2d')

  // --- low-res glyph raster ---
  const glyphs = document.createElement('canvas')
  glyphs.width = GW
  glyphs.height = GH
  const g = glyphs.getContext('2d', { willReadFrequently: true })

  // --- pre-baked corner vignette, stamped over every redraw ---
  const vig = document.createElement('canvas')
  vig.width = TW
  vig.height = TH
  {
    const vc = vig.getContext('2d')
    const grad = vc.createRadialGradient(
      TW / 2, TH / 2, TH * 0.32,
      TW / 2, TH / 2, TW * 0.62
    )
    grad.addColorStop(0, 'rgba(0,0,0,0)')
    grad.addColorStop(1, 'rgba(0,0,0,0.55)')
    vc.fillStyle = grad
    vc.fillRect(0, 0, TW, TH)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace

  let mode = 'RD'
  let accent = '#d71921' // live accent — setAccent() swaps it + redraws
  let lastTime = 0
  let lastTick = -Infinity

  // ---------- glyph-layer helpers (64x48 space) ----------

  function text(str, size, x, y) {
    g.font = `700 ${size}px monospace`
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillStyle = '#fff'
    g.fillText(str, x, y)
  }

  function bar(x, y, w, h, color = '#fff') {
    g.fillStyle = color
    g.fillRect(x, y, w, h)
  }

  // draw the current mode into the low-res raster (64x48 glyph space)
  function drawGlyphs(t) {
    g.clearRect(0, 0, GW, GH)

    // hairline frame around the screen content area
    g.strokeStyle = 'rgba(255,255,255,0.35)'
    g.lineWidth = 1
    g.strokeRect(3.5, 3.5, GW - 7, GH - 7)

    // tiny corner header — always-on device chrome
    g.font = '400 4px monospace'
    g.textAlign = 'left'
    g.fillStyle = 'rgba(255,255,255,0.6)'
    g.fillText('UNIT_01', 6, 8)
    g.textAlign = 'right'
    g.fillText(mode, GW - 6, 8)

    switch (mode) {
      case 'BOOT': {
        text('INIT', 7, 32, 16)
        // segmented bar — fills over ~2.6s, holds, loops
        const p = Math.min(1, (t % 4) / 2.6)
        const on = Math.floor(p * 16)
        for (let i = 0; i < 16; i++) {
          g.fillStyle = i < on ? '#fff' : 'rgba(255,255,255,0.25)'
          g.fillRect(8 + i * 3, 30, 2, 5)
        }
        // % readout under the bar
        g.font = '400 5px monospace'
        g.textAlign = 'center'
        g.fillStyle = '#fff'
        g.fillText(`${Math.round(p * 100)}%`, 32, 42)
        break
      }

      case 'RD':
        text('RD', 30, 32, 24)
        g.font = '400 5px monospace'
        g.textAlign = 'center'
        g.fillStyle = 'rgba(255,255,255,0.7)'
        g.fillText('CREATIVE ENGINEER', 32, 40)
        break

      case 'HELLO': {
        text('HELLO.', 18, 32, 22)
        // blinking block cursor under the greeting
        if (Math.floor(t * 2.4) % 2 === 0) bar(30, 32, 6, 7)
        break
      }

      case 'DIAG': {
        text('DIAG', 12, 32, 16)
        // three animated bars + labels — a live readout
        const bars = [
          ['CPU', 40, Math.abs(Math.sin(t * 0.7)) * 0.4 + 0.5],
          ['MEM', 26, Math.abs(Math.sin(t * 0.45 + 2)) * 0.3 + 0.55],
          ['GFX', 46, Math.abs(Math.sin(t * 0.9 + 4)) * 0.5 + 0.35],
        ]
        bars.forEach(([label, w, k], i) => {
          const y = 22 + i * 8
          g.font = '400 4px monospace'
          g.textAlign = 'left'
          g.fillStyle = 'rgba(255,255,255,0.6)'
          g.fillText(label, 8, y + 2)
          bar(18, y, w * k, 2)
          g.fillStyle = 'rgba(255,255,255,0.5)'
          g.fillText(`${Math.round(k * 100)}`, 18 + w * k + 2, y + 2)
        })
        break
      }

      case 'STATS': {
        text('STATS', 12, 32, 15)
        const rows = [['FRNT', 94], ['AI', 81], ['BACK', 75], ['HARD', 69]]
        rows.forEach(([label, n], i) => {
          const y = 22 + i * 6
          g.font = '400 4px monospace'
          g.textAlign = 'left'
          g.fillStyle = 'rgba(255,255,255,0.7)'
          g.fillText(`${label} ${n}%`, 8, y + 2)
          bar(8, y + 4, (n / 100) * 48, 1)
        })
        break
      }

      case '01':
      case '02':
      case '03': {
        const names = { '01': 'SMARTCV', '02': 'STUDYFLOW', '03': 'LAUNCHLYR' }
        text(mode, 22, 32, 22)
        g.font = '400 6px monospace'
        g.textAlign = 'center'
        g.fillStyle = '#fff'
        g.fillText(names[mode], 32, 38)
        break
      }

      case 'TX': {
        text('TX_RDY', 11, 30, 20)
        // blinking block cursor (~2.4Hz) — the screen's red interrupt
        if (Math.floor(t * 2.4) % 2 === 0) {
          const w = g.measureText('TX_RDY').width
          bar(30 + w / 2 + 3, 15, 5, 9, ACCENT_MARK)
        }
        g.font = '400 5px monospace'
        g.textAlign = 'center'
        g.fillStyle = ACCENT_MARK
        g.fillText('SEND>', 32, 40)
        break
      }

      default:
        text('RD', 30, 32, 24)
    }
  }

  // ---------- full redraw: raster -> dots -> CRT dressing ----------

  function redraw(t) {
    drawGlyphs(t)
    const img = g.getImageData(0, 0, GW, GH).data

    ctx.globalAlpha = 1
    ctx.fillStyle = '#030303'
    ctx.fillRect(0, 0, TW, TH)

    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        const i4 = (y * GW + x) * 4
        const a = img[i4 + 3]
        if (a < ALPHA_MIN) continue
        // accent-marker pixels render in the live accent; rest are white phosphor
        const r = img[i4]
        ctx.fillStyle = r > 100 && img[i4 + 1] < 80 && img[i4 + 2] < 80 && r > img[i4 + 1] * 2
          ? accent
          : '#e8e8e8'
        ctx.globalAlpha = (a / 255) * (Math.random() < FLICKER ? 0.35 : 1)
        ctx.beginPath()
        ctx.arc(x * PITCH + PITCH / 2, y * PITCH + PITCH / 2, DOT_R, 0, 6.2832)
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1

    // scanlines — every 4th texture row ~18% darker
    ctx.fillStyle = 'rgba(0,0,0,0.18)'
    for (let y = 3; y < TH; y += 4) ctx.fillRect(0, y, TW, 1)

    ctx.drawImage(vig, 0, 0)
    texture.needsUpdate = true
  }

  // ---------- public API ----------

  function setMode(m) {
    if (m === mode) return
    mode = m
    redraw(lastTime)
  }

  function setAccent(hex) {
    if (hex === accent) return
    accent = hex
    redraw(lastTime)
  }

  function update(time) {
    if (time - lastTick < TICK) return
    lastTick = time
    lastTime = time
    redraw(time)
  }

  function dispose() {
    texture.dispose()
  }

  redraw(0)

  return { texture, setMode, setAccent, update, dispose }
}
