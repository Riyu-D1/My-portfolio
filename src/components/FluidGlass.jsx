/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, memo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass({
  mode = 'cube',
  scale = 0.25,
  ior = 1.15,
  thickness = 5,
  anisotropy = 0.01,
  chromaticAberration = 0.1,
  ...props
}) {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Suspense fallback={null}>
        <Cube
          modeProps={{
            scale,
            ior,
            thickness,
            anisotropy,
            chromaticAberration,
            ...props,
          }}
        />
      </Suspense>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  glb,
  geometryKey,
  modeProps = {},
  ...props
}) {
  const ref = useRef();
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  // Automatically find the first geometry from the GLTF file instead of a hardcoded key
  const geometry = Object.values(nodes).find((n) => n.geometry)?.geometry;

  useFrame((state, delta) => {
    const { gl, camera } = state;
    
    // Animate internal wobble to give it the "liquid" breathing effect within bounds
    const time = state.clock.elapsedTime;
    const wobbleX = Math.sin(time * 3) * 0.1;
    const wobbleY = Math.cos(time * 2) * 0.05;
    
    easing.damp3(ref.current.position, [wobbleX, wobbleY, 15], 0.15, delta);
    
    // Stretch animation (breathing)
    const stretch = 1 + Math.sin(time * 4) * 0.05;
    ref.current.scale.x = (modeProps.scale ?? 0.15) * stretch;
    ref.current.scale.y = (modeProps.scale ?? 0.15) / stretch;
    ref.current.scale.z = modeProps.scale ?? 0.15;

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      <mesh scale={[vp.width, vp.height, 1]} position={[0,0,14]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={0} />
      </mesh>
      {geometry && (
        <mesh ref={ref} rotation-x={Math.PI / 2} geometry={geometry} {...props}>
          <MeshTransmissionMaterial
            buffer={buffer.texture}
            ior={ior ?? 1.15}
            thickness={thickness ?? 5}
            anisotropy={anisotropy ?? 0.01}
            chromaticAberration={chromaticAberration ?? 0.1}
            transmission={1}
            roughness={0}
            clearcoat={0.1}
            {...extraMat}
          />
        </mesh>
      )}
    </>
  );
});

function Cube({ modeProps, ...p }) {
  // Uses the downloaded React Bits cube geometry
  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" modeProps={modeProps} {...p} />;
}
