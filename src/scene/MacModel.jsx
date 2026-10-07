// Stylized 1984-Macintosh unit built from primitives.
// Rounded-box silhouettes + drei <Edges> hairlines give the
// wireframe-monolith look; rig.matMode cross-fades wire/solid/glass.
// All per-frame mutation goes through refs — render stays pure.

import { useEffect, useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import { rig } from './scrollRig'

const EDGE = '#e8e8e8'
const { lerp, clamp } = THREE.MathUtils

// material-mode keyframes — matMode lerps 0 -> 1 -> 2
const K_WIRE  = { op: 0.04, met: 0.05, rgh: 0.95, edge: 1 }    // ghost body, full wireframe
const K_SOLID = { op: 1.0,  met: 0.05, rgh: 0.95, edge: 0.55 } // solid monolith
const K_GLASS = { op: 0.12, met: 0.9,  rgh: 0.1,  edge: 1 }    // tinted glass

const KEY_ROWS = 4
const KEY_COLS = 9

// box part with shared material ref + hairline edges
function Part({ size, pos, rot = [0, 0, 0], dark, accent, addMat, addEdge, addAccent }) {
  return (
    <mesh position={pos} rotation={rot}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        ref={(m) => { addMat(m); if (accent) addAccent(m) }}
        color={accent ? '#d71921' : dark ? '#010101' : '#060606'}
        metalness={0.05}
        roughness={0.95}
        transparent
        opacity={K_WIRE.op}
      />
      <Edges threshold={15} color={EDGE} lineWidth={1} ref={addEdge} />
    </mesh>
  )
}

function push(list, item) {
  if (item && list.current.indexOf(item) === -1) list.current.push(item)
}

export default function MacModel({ tex }) {
  const group = useRef(null)
  const keysRef = useRef(null)
  const mats = useRef([])     // all body/dark MeshStandardMaterials
  const accentMats = useRef([]) // accent-colored materials (power LED, esc key)
  const edgeMats = useRef([]) // every Edges' LineMaterial
  const screenMat = useRef(null)
  const glowMat = useRef(null)
  // damped material state — no allocation in the loop
  const cur = useRef({ op: K_WIRE.op, met: K_WIRE.met, rgh: K_WIRE.rgh, edge: 1, glow: 1 })
  const accentCol = useRef(new THREE.Color(rig.accent))
  const accentTarget = useRef(new THREE.Color(rig.accent))
  const lastAccent = useRef(rig.accent)

  const addMat = (m) => push(mats, m)
  const addAccent = (m) => push(accentMats, m)
  const addEdge = (l) => push(edgeMats, l && l.material)

  // instanced key grid — written once, never touched again
  useLayoutEffect(() => {
    const inst = keysRef.current
    if (!inst) return
    const m = new THREE.Matrix4()
    let i = 0
    for (let r = 0; r < KEY_ROWS; r++) {
      for (let c = 0; c < KEY_COLS; c++) {
        const isSpaceRow = r === KEY_ROWS - 1
        const w = isSpaceRow && c === 4 ? 0.62 : 0.13
        const skip = isSpaceRow && (c === 5 || c === 6 || c === 7) // spacebar spans
        const escKey = r === 0 && c === 0 // red key renders separately
        if (skip || escKey) continue
        m.makeTranslation(
          -0.62 + c * 0.155 + (isSpaceRow ? 0.24 : 0),
          0,
          -0.21 + r * 0.14
        )
        if (isSpaceRow && c === 4) m.scale(new THREE.Vector3(w / 0.13, 1, 1))
        inst.setMatrixAt(i++, m)
      }
    }
    inst.count = i
    inst.instanceMatrix.needsUpdate = true
  }, [])

  useEffect(() => () => {
    mats.current.length = 0
    edgeMats.current.length = 0
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // --- material mode crossfade (piecewise lerp over keyframes) ---
    const m = clamp(rig.matMode, 0, 2)
    const hi = m > 1
    const A = hi ? K_SOLID : K_WIRE
    const B = hi ? K_GLASS : K_SOLID
    const f = hi ? m - 1 : m

    const c = cur.current
    const k = 0.14 // per-frame damp toward targets
    c.op   += (lerp(A.op,   B.op,   f) - c.op) * k
    c.met  += (lerp(A.met,  B.met,  f) - c.met) * k
    c.rgh  += (lerp(A.rgh,  B.rgh,  f) - c.rgh) * k
    c.edge += (lerp(A.edge, B.edge, f) - c.edge) * k
    c.glow += (rig.glow - c.glow) * k

    const ms = mats.current
    for (let i = 0; i < ms.length; i++) {
      ms[i].opacity = c.op
      ms[i].metalness = c.met
      ms[i].roughness = c.rgh
    }
    const em = edgeMats.current
    for (let i = 0; i < em.length; i++) em[i].opacity = c.edge

    // --- accent crossfade — damped hue lerp on accent parts ---
    if (rig.accent !== lastAccent.current) {
      accentTarget.current.set(rig.accent)
      lastAccent.current = rig.accent
    }
    accentCol.current.lerp(accentTarget.current, k)
    const am = accentMats.current
    for (let i = 0; i < am.length; i++) am[i].color.copy(accentCol.current)

    // --- screen phosphor intensity ---
    const inten = 1.1 * c.glow
    if (screenMat.current) screenMat.current.color.setScalar(inten)
    if (glowMat.current) glowMat.current.opacity = 0.07 * c.glow

    // --- idle float ---
    const grp = group.current
    if (grp) {
      grp.position.y = Math.sin(t * 0.8) * 0.04
      grp.rotation.x = Math.sin(t * 0.5) * 0.015
    }
  })

  return (
    <group ref={group} position={[0, 0.18, 0]}>
      {/* ===== the machine ===== */}
      {/* main body — taller than wide, classic Mac silhouette */}
      <Part size={[1.62, 2.0, 1.45]} pos={[0, 0.32, 0]} addMat={addMat} addEdge={addEdge} />
      {/* sloped upper-rear wedge */}
      <Part size={[1.4, 0.55, 0.5]} pos={[0, 1.3, -0.44]} rot={[-0.22, 0, 0]} addMat={addMat} addEdge={addEdge} />
      {/* foot */}
      <Part size={[1.78, 0.13, 1.62]} pos={[0, -0.74, 0]} addMat={addMat} addEdge={addEdge} />

      {/* bezel — 4 chunky rails around the recessed screen */}
      <Part size={[1.46, 0.13, 0.14]} pos={[0, 1.12, 0.72]} addMat={addMat} addEdge={addEdge} />
      <Part size={[1.46, 0.13, 0.14]} pos={[0, 0.06, 0.72]} addMat={addMat} addEdge={addEdge} />
      <Part size={[0.13, 0.94, 0.14]} pos={[-0.665, 0.59, 0.72]} addMat={addMat} addEdge={addEdge} />
      <Part size={[0.13, 0.94, 0.14]} pos={[0.665, 0.59, 0.72]} addMat={addMat} addEdge={addEdge} />

      {/* glow halo behind the screen */}
      <mesh position={[0, 0.59, 0.72]}>
        <planeGeometry args={[1.4, 1.0]} />
        <meshBasicMaterial
          ref={glowMat}
          color="#e8e8e8"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* CRT screen — dot-matrix texture */}
      <mesh position={[0, 0.59, 0.76]}>
        <planeGeometry args={[1.24, 0.95]} />
        <meshBasicMaterial ref={screenMat} map={tex.texture} toneMapped={false} />
      </mesh>

      {/* floppy slot — lower right of the face */}
      <Part size={[0.5, 0.045, 0.05]} pos={[0.3, -0.28, 0.74]} dark addMat={addMat} addEdge={addEdge} />
      {/* power button — lower left, the unit's accent LED */}
      <Part size={[0.14, 0.14, 0.06]} pos={[-0.55, -0.34, 0.74]} accent addMat={addMat} addAccent={addAccent} addEdge={addEdge} />

      {/* three vents on top */}
      <Part size={[0.4, 0.025, 0.09]} pos={[-0.48, 1.33, 0.28]} dark addMat={addMat} addEdge={addEdge} />
      <Part size={[0.4, 0.025, 0.09]} pos={[0,     1.345, 0.28]} dark addMat={addMat} addEdge={addEdge} />
      <Part size={[0.4, 0.025, 0.09]} pos={[0.48,  1.33, 0.28]} dark addMat={addMat} addEdge={addEdge} />

      {/* ===== keyboard — flat slab + instanced keys, in front ===== */}
      <group position={[0, -1.02, 1.85]} rotation={[-0.06, 0, 0]}>
        <Part size={[1.7, 0.11, 0.66]} pos={[0, 0, 0]} addMat={addMat} addEdge={addEdge} />
        <instancedMesh
          ref={keysRef}
          args={[undefined, undefined, KEY_ROWS * KEY_COLS]}
          position={[0, 0.075, 0]}
        >
          <boxGeometry args={[0.13, 0.05, 0.11]} />
          <meshStandardMaterial ref={addMat} color="#020202" transparent opacity={K_WIRE.op} />
        </instancedMesh>
        {/* the accent key — top-left corner */}
        <mesh position={[-0.62, 0.075, -0.21]}>
          <boxGeometry args={[0.13, 0.05, 0.11]} />
          <meshStandardMaterial ref={(m) => { addMat(m); addAccent(m) }} color="#d71921" transparent opacity={K_WIRE.op} />
        </mesh>
      </group>

      {/* ===== mouse — right of the keyboard ===== */}
      <group position={[1.35, -1.0, 1.7]} rotation={[0, -0.3, 0]}>
        <Part size={[0.34, 0.12, 0.5]} pos={[0, 0, 0]} addMat={addMat} addEdge={addEdge} />
        {/* button split line */}
        <Part size={[0.02, 0.02, 0.2]} pos={[0, 0.065, -0.12]} dark addMat={addMat} addEdge={addEdge} />
      </group>
    </group>
  )
}
