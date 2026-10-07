// Fixed full-viewport WebGL layer — the instrument itself.
// DOM contract: one <div className="scene-fixed"> (fixed, inset 0, z 0,
// pointer-events none) containing a single R3F <Canvas>. All motion is
// driven by the mutable `rig` object — zero React state in the loop.

import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import MacModel from './MacModel'
import { createScreenTexture } from './screenTexture'
import { rig } from './scrollRig'

const DUST_COUNT = 220

// deterministic pseudo-random in [0,1) — pure, so it's render-safe
// and the dust layout is stable across re-renders
function rand(i) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

// sparse ambient dust drifting in a 14x9x8 volume
function Dust() {
  const ref = useRef(null)
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const pos = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      pos[i * 3]     = (rand(i * 3)     - 0.5) * 14
      pos[i * 3 + 1] = (rand(i * 3 + 1) - 0.5) * 9
      pos[i * 3 + 2] = (rand(i * 3 + 2) - 0.5) * 8
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  useEffect(() => () => geo.dispose(), [geo])

  useFrame((state) => {
    const p = ref.current
    if (!p) return
    const t = state.clock.elapsedTime
    p.rotation.y = t * 0.01
    p.position.y = Math.sin(t * 0.15) * 0.15
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.015}
        color="#8a8a8a"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// dot-grid floor — Nothing motif in 3D, grounds the floating unit
function DotFloor() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const N = 33 // points per side
    const gap = 0.55
    const pos = new Float32Array(N * N * 3)
    let i = 0
    for (let x = 0; x < N; x++) {
      for (let z = 0; z < N; z++) {
        pos[i * 3]     = (x - (N - 1) / 2) * gap
        pos[i * 3 + 1] = -1.28
        pos[i * 3 + 2] = (z - (N - 1) / 2) * gap + 0.8
        i++
      }
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  useEffect(() => () => geo.dispose(), [geo])
  return (
    <points geometry={geo}>
      <pointsMaterial
        size={0.02}
        color="#5c5c5c"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// reads the mutable rig every frame — camera, device yaw, screen mode
function RigUpdater({ modelRef, screen }) {
  const lastScreen = useRef('')
  const lastAccent = useRef('')

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const cam = state.camera

    // per-frame smoothing on top of the GSAP scrub —
    // on portrait screens the camera pulls back so the unit fits
    const zoom = cam.aspect < 1 ? 1 + (1 - cam.aspect) * 0.85 : 1
    cam.position.x += (rig.px - cam.position.x) * 0.12
    cam.position.y += (rig.py - cam.position.y) * 0.12
    cam.position.z += (rig.pz * zoom - cam.position.z) * 0.12
    cam.lookAt(rig.tx, rig.ty, rig.tz)

    if (modelRef.current) {
      modelRef.current.rotation.y = rig.rotY + Math.sin(t * 0.3) * 0.02
    }

    // bridge the imperative rig.screen string -> CRT texture
    if (rig.screen !== lastScreen.current) {
      lastScreen.current = rig.screen
      screen.setMode(rig.screen)
    }
    // accent swaps re-tint the phosphor pass
    if (rig.accent !== lastAccent.current) {
      lastAccent.current = rig.accent
      screen.setAccent(rig.accent)
    }
    screen.update(t)
  })

  return null
}

export default function DeviceScene() {
  const screen = useMemo(() => createScreenTexture(), [])
  const modelRef = useRef(null)

  useEffect(() => () => screen.dispose(), [screen])

  return (
    <div
      className="scene-fixed"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: '#000',
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 45, position: [0, 0.35, 7.5] }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 14, 34]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 5, 4]} intensity={0.9} />

        <Dust />
        <DotFloor />
        <group ref={modelRef}>
          <MacModel tex={screen} />
        </group>
        <RigUpdater modelRef={modelRef} screen={screen} />
      </Canvas>
    </div>
  )
}
