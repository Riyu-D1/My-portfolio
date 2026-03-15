/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from '../assets/lanyard/card.glb';
import idPhoto from '../assets/memoji.png';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 20], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(null);
  const fixed = useRef(null);
  const j1 = useRef(null);
  const j2 = useRef(null);
  const j3 = useRef(null);
  const card = useRef(null);
  const canvasElementRef = useRef(null);
  const dragPointerRef = useRef(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGLB);
  const idPhotoTexture = useTexture(idPhoto);

  const cardPanelLayout = useMemo(() => {
    const geometry = nodes?.card?.geometry;

    if (!geometry) {
      return {
        panelWidth: 0.74,
        panelHeight: 1.08,
        panelX: 0,
        panelY: -0.24,
        panelZ: 0.0435,
      };
    }

    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    if (!box) {
      return {
        panelWidth: 0.74,
        panelHeight: 1.08,
        panelX: 0,
        panelY: -0.24,
        panelZ: 0.0435,
      };
    }

    const cardWidth = box.max.x - box.min.x;
    const cardHeight = box.max.y - box.min.y;
    const centerX = (box.max.x + box.min.x) * 0.5;
    const centerY = (box.max.y + box.min.y) * 0.5;

    return {
      panelWidth: cardWidth * 0.8,
      panelHeight: cardHeight * 0.9,
      panelX: centerX,
      panelY: centerY - cardHeight * 0.01,
      panelZ: box.max.z + 0.004,
    };
  }, [nodes]);

  const bandTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    if (!context) return null;

    context.fillStyle = '#0f0f0f';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.font = '700 92px Arial';
    context.textAlign = 'left';
    context.textBaseline = 'middle';

    for (let x = -140; x < canvas.width + 280; x += 360) {
      context.save();
      context.translate(x, canvas.height / 2);
      context.rotate(-0.09);
      context.fillText('RD', 0, 0);
      context.restore();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 1);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, []);

  const idPanelTexture = useMemo(() => {
    if (!idPhotoTexture?.image) return null;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1536;
    const context = canvas.getContext('2d');
    if (!context) return null;

    context.fillStyle = '#f1f5f9';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#d9e3ef';
    context.fillRect(52, 52, canvas.width - 104, canvas.height - 104);

    context.fillStyle = '#f7f9fc';
    context.fillRect(78, 78, canvas.width - 156, canvas.height - 156);

    // Fill the inner panel so the image reaches the card corners
    const photoInset = 16;
    const photoX = photoInset;
    const photoY = photoInset;
    const photoWidth = canvas.width - photoInset * 2;
    const photoHeight = canvas.height - photoInset * 2;

    const image = idPhotoTexture.image;
    const sourceWidth = image.width;
    const sourceHeight = image.height;
    const sourceRatio = sourceWidth / sourceHeight;
    const targetRatio = photoWidth / photoHeight;

    let cropWidth = sourceWidth;
    let cropHeight = sourceHeight;
    let cropX = 0;
    let cropY = 0;

    if (sourceRatio > targetRatio) {
      cropWidth = sourceHeight * targetRatio;
      cropX = (sourceWidth - cropWidth) * 0.5;
    } else {
      cropHeight = sourceWidth / targetRatio;
      cropY = (sourceHeight - cropHeight) * 0.5; // center crop vertically
    }

    context.drawImage(image, cropX, cropY, cropWidth, cropHeight, photoX, photoY, photoWidth, photoHeight);

    context.fillStyle = 'rgba(247, 249, 252, 0.82)';
    context.fillRect(photoInset, canvas.height - 220, canvas.width - photoInset * 2, 130);

    context.fillStyle = '#111111';
    context.font = 'italic 700 82px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Riyansh Diwan', canvas.width / 2, 1420);

    context.fillStyle = '#4b5563';
    context.font = '500 36px Arial';
    context.fillText('Creative Developer', canvas.width / 2, 1480);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  }, [idPhotoTexture]);

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useEffect(() => {
    if (!dragged) {
      dragPointerRef.current = null;
      return undefined;
    }

    const handlePointerMove = (event) => {
      const canvasElement = canvasElementRef.current;
      if (!canvasElement) return;
      const rect = canvasElement.getBoundingClientRect();
      const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const normalizedY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      dragPointerRef.current = { x: normalizedX, y: normalizedY };
    };

    const handlePointerUp = () => {
      drag(false);
      dragPointerRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragged]);

  useFrame((state, delta) => {
    if (!canvasElementRef.current) {
      canvasElementRef.current = state.gl.domElement;
    }

    if (dragged) {
      const activePointer = dragPointerRef.current ?? state.pointer;
      vec.set(activePointer.x, activePointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current?.geometry) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  idPhotoTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              event.target.releasePointerCapture(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event) => {
              event.target.setPointerCapture(event.pointerId);
              drag(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                color="#f1f5f9"
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh position={[cardPanelLayout.panelX, cardPanelLayout.panelY, cardPanelLayout.panelZ]}>
              <planeGeometry args={[cardPanelLayout.panelWidth, cardPanelLayout.panelHeight]} />
              <meshBasicMaterial map={idPanelTexture} transparent={false} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={bandTexture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);
