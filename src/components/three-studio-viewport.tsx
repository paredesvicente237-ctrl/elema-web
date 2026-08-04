'use client';

import { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox, useTexture } from '@react-three/drei';

export type StudioProduct = 'cocina' | 'parrilla' | 'campana';
export type StudioFinish = 'grafito' | 'satinado' | 'bronce' | 'piedra';
export type StudioView = 'perspectiva' | 'frontal' | 'superior';
export type SceneMode = 'dia' | 'noche';

export type StudioConfig = {
  product: StudioProduct;
  format: string;
  finish: StudioFinish;
  width: number;
  depth: number;
  height: number;
  modules: Record<string, boolean>;
};

type ViewportProps = {
  config: StudioConfig;
  view: StudioView;
  sceneMode: SceneMode;
};

const finishPalette: Record<StudioFinish, { color: string; metalness: number; roughness: number }> = {
  grafito: { color: '#343736', metalness: 0.56, roughness: 0.29 },
  satinado: { color: '#aeb2b1', metalness: 0.92, roughness: 0.18 },
  bronce: { color: '#665142', metalness: 0.84, roughness: 0.25 },
  piedra: { color: '#454846', metalness: 0.7, roughness: 0.31 },
};

export function ThreeStudioViewport({ config, view, sceneMode }: ViewportProps) {
  const [canvasKey, setCanvasKey] = useState(0);
  const label = `${config.product}, formato ${config.format}, ${config.width.toFixed(1)} metros de ancho, acabado ${config.finish}`;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refreshCanvas = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setCanvasKey((current) => current + 1), 220);
    };

    window.addEventListener('resize', refreshCanvas);
    return () => {
      window.removeEventListener('resize', refreshCanvas);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div role="img" aria-label={`Vista 3D interactiva de ${label}`} className="h-full min-h-[30rem] w-full">
      <Canvas
        key={canvasKey}
        shadows="variance"
        frameloop="always"
        dpr={[1, 1.5]}
        camera={{ position: [4.8, 3.2, 5.4], fov: 34, near: 0.1, far: 100 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        style={{ touchAction: 'pan-y' }}
        fallback={<div className="grid h-full place-items-center bg-[#ddd7ce] px-8 text-center text-sm text-[#625c55]">Este dispositivo no pudo iniciar la vista 3D.</div>}
      >
        <color attach="background" args={[sceneMode === 'dia' ? '#d8d3ca' : '#111211']} />
        <fog attach="fog" args={[sceneMode === 'dia' ? '#d8d3ca' : '#111211', 11, 24]} />
        <StudioEnvironment mode={sceneMode} />
        <SceneLights mode={sceneMode} />
        <CameraRig config={config} view={view} />
        <group position={[0, -0.03, 0]}>
          {config.product === 'cocina' ? <KitchenModel config={config} /> : null}
          {config.product === 'parrilla' ? <GrillModel config={config} /> : null}
          {config.product === 'campana' ? <HoodModel config={config} /> : null}
        </group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.04, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color={sceneMode === 'dia' ? '#bdb6ac' : '#1c1e1d'} roughness={0.82} />
        </mesh>
        <mesh receiveShadow position={[0, 3.1, -5.8]}>
          <planeGeometry args={[18, 8]} />
          <meshStandardMaterial color={sceneMode === 'dia' ? '#c8c2b9' : '#181a19'} roughness={0.92} />
        </mesh>
        <ContactShadows position={[0, -0.025, 0]} opacity={sceneMode === 'dia' ? 0.32 : 0.56} scale={14} blur={3.2} far={7} frames={24} />
        <OrbitControls
          makeDefault
          target={[0, config.product === 'campana' ? 1.35 : 0.72, 0]}
          enablePan={false}
          enableZoom={false}
          minDistance={2.4}
          maxDistance={10}
          minPolarAngle={0.22}
          maxPolarAngle={Math.PI / 2.02}
        />
      </Canvas>
    </div>
  );
}

function SceneLights({ mode }: { mode: SceneMode }) {
  return (
    <>
      <hemisphereLight intensity={mode === 'dia' ? 1.35 : 0.34} color={mode === 'dia' ? '#fffaf0' : '#8b98a6'} groundColor={mode === 'dia' ? '#777169' : '#080909'} />
      <directionalLight castShadow position={[5, 8, 6]} intensity={mode === 'dia' ? 2.8 : 0.72} color={mode === 'dia' ? '#fff5df' : '#abb7c5'} shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-bias={-0.0003} />
      <directionalLight position={[-5, 4, 2]} intensity={mode === 'dia' ? 1.5 : 0.5} color="#dce8ef" />
      <directionalLight position={[0, 2, -5]} intensity={mode === 'dia' ? 1.05 : 0.3} color="#f0c68d" />
      {mode === 'noche' ? <pointLight position={[1.8, 3.5, 2.8]} intensity={28} distance={10} color="#e8b66f" /> : null}
    </>
  );
}

function StudioEnvironment({ mode }: { mode: SceneMode }) {
  return (
    <Environment resolution={128}>
      <Lightformer form="rect" intensity={mode === 'dia' ? 4.5 : 1.8} color={mode === 'dia' ? '#fff8ea' : '#b6c3d0'} position={[0, 5, -4]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
      <Lightformer form="rect" intensity={mode === 'dia' ? 3.2 : 1.1} color="#dbe5eb" position={[-5, 2, 1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
      <Lightformer form="rect" intensity={mode === 'dia' ? 2.4 : 2.8} color="#e6af6a" position={[5, 2, 2]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} />
      <Lightformer form="ring" intensity={mode === 'dia' ? 1.4 : 0.7} color="#ffffff" position={[0, 4, 6]} scale={3} />
    </Environment>
  );
}

function CameraRig({ config, view }: { config: StudioConfig; view: StudioView }) {
  const { camera, invalidate } = useThree();

  useEffect(() => {
    const targetY = config.product === 'campana' ? 1.3 : config.product === 'parrilla' ? 0.68 : 0.64;
    const formatFactor = config.format === 'en-l' ? 1.26 : config.format === 'isla' ? 1.14 : 1;
    const distance = config.product === 'parrilla'
      ? Math.max(4.25, config.width * 1.34)
      : Math.max(config.product === 'campana' ? 4.6 : 5.1, config.width * 1.46 * formatFactor);
    const positions: Record<StudioView, [number, number, number]> = {
      perspectiva: [distance * 0.72, config.product === 'campana' ? 3.05 : config.product === 'parrilla' ? 3.4 : 2.7, distance],
      frontal: [0, targetY + 0.5, distance * 1.15],
      superior: [0.01, Math.max(6.2, config.width * 1.9 * formatFactor), 0.01],
    };
    camera.position.set(...positions[view]);
    camera.lookAt(0, targetY, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, config.format, config.product, config.width, invalidate, view]);

  return null;
}

function FinishMaterial({ finish, offset = 0 }: { finish: StudioFinish; offset?: number }) {
  const material = finishPalette[finish];
  return <meshPhysicalMaterial color={material.color} metalness={material.metalness} roughness={Math.min(1, material.roughness + offset)} clearcoat={finish === 'satinado' ? 0.44 : 0.24} clearcoatRoughness={0.32} />;
}

function StoneMaterial() {
  return <meshPhysicalMaterial color="#d8d2c8" metalness={0.04} roughness={0.38} clearcoat={0.2} clearcoatRoughness={0.5} />;
}

function KitchenModel({ config }: { config: StudioConfig }) {
  const secondaryWidth = Math.max(1.4, config.width * 0.68);

  return (
    <group>
      {config.format === 'lineal' ? <CounterRun config={config} width={config.width} /> : null}
      {config.format === 'isla' ? (
        <>
          <CounterRun config={config} width={config.width} position={[0, 0, -0.85]} showAppliances={false} />
          <CounterRun config={config} width={secondaryWidth} position={[0, 0, 1.05]} island />
        </>
      ) : null}
      {config.format === 'en-l' ? (
        <>
          <CounterRun config={config} width={config.width} position={[0, 0, 0.15]} />
          <CounterRun config={config} width={secondaryWidth} position={[config.width / 2 - config.depth / 2, 0, -secondaryWidth / 2 + 0.2]} rotation={[0, Math.PI / 2, 0]} />
        </>
      ) : null}
      {config.modules.repisas ? <KitchenShelves width={Math.min(config.width * 0.62, 2.2)} finish={config.finish} /> : null}
      {config.modules.luz ? <WarmStrip width={Math.min(config.width * 0.72, 2.8)} position={[0, 1.38, -config.depth / 2 - 0.03]} /> : null}
    </group>
  );
}

function CounterRun({ config, width, position = [0, 0, 0], rotation = [0, 0, 0], island = false, showAppliances = true }: { config: StudioConfig; width: number; position?: [number, number, number]; rotation?: [number, number, number]; island?: boolean; showAppliances?: boolean }) {
  const panelCount = Math.max(3, Math.round(width / 0.62));
  const panelWidth = width / panelCount;
  const frontZ = config.depth / 2 + 0.012;
  const cabinetHeight = config.height - 0.08;

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox castShadow receiveShadow args={[width, cabinetHeight, config.depth]} radius={0.018} smoothness={4} position={[0, cabinetHeight / 2 + 0.08, 0]}>
        <FinishMaterial finish={config.finish} offset={0.08} />
      </RoundedBox>
      <mesh castShadow position={[0, 0.055, 0.02]}>
        <boxGeometry args={[width * 0.92, 0.11, config.depth * 0.84]} />
        <meshStandardMaterial color="#161817" metalness={0.42} roughness={0.44} />
      </mesh>
      {Array.from({ length: panelCount }).map((_, index) => (
        <mesh key={index} castShadow position={[-width / 2 + panelWidth / 2 + index * panelWidth, cabinetHeight / 2 + 0.08, frontZ]}>
          <boxGeometry args={[panelWidth - 0.018, cabinetHeight - 0.055, 0.018]} />
          <FinishMaterial finish={config.finish} />
        </mesh>
      ))}
      <mesh castShadow receiveShadow position={[0, config.height + 0.045, 0]}>
        <boxGeometry args={[width + 0.05, 0.09, config.depth + 0.055]} />
        {config.finish === 'piedra' ? <StoneMaterial /> : <FinishMaterial finish={config.finish} offset={-0.08} />}
      </mesh>
      {!island ? (
        <mesh receiveShadow position={[0, config.height + 0.42, -config.depth / 2 + 0.01]}>
          <boxGeometry args={[width, 0.74, 0.035]} />
          <meshStandardMaterial color="#bdb6aa" roughness={0.58} />
        </mesh>
      ) : null}
      {showAppliances && config.modules.lavaplatos ? <Sink position={[-width * 0.22, config.height + 0.096, 0]} /> : null}
      {showAppliances && config.modules.encimera ? <Cooktop position={[width * 0.22, config.height + 0.096, 0]} /> : null}
      {showAppliances && config.modules.horno ? <Oven position={[width * 0.18, config.height * 0.5, frontZ + 0.02]} width={Math.min(0.62, panelWidth * 0.92)} /> : null}
      {showAppliances && config.modules.cava ? <WineCellar position={[-width * 0.25, config.height * 0.48, frontZ + 0.022]} width={Math.min(0.5, panelWidth * 0.84)} /> : null}
    </group>
  );
}

function Sink({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RoundedBox receiveShadow args={[0.56, 0.038, 0.37]} radius={0.025} smoothness={5}>
        <meshPhysicalMaterial color="#9da3a1" metalness={0.94} roughness={0.2} clearcoat={0.24} />
      </RoundedBox>
      <RoundedBox args={[0.46, 0.045, 0.28]} radius={0.035} smoothness={5} position={[-0.025, -0.012, 0]}>
        <meshStandardMaterial color="#3f4543" metalness={0.88} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0.22, 0.14, -0.15]}><cylinderGeometry args={[0.018, 0.018, 0.26, 16]} /><meshPhysicalMaterial color="#b7bcba" metalness={0.96} roughness={0.17} clearcoat={0.32} /></mesh>
      <mesh position={[0.22, 0.26, -0.09]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.018, 0.018, 0.13, 16]} /><meshPhysicalMaterial color="#b7bcba" metalness={0.96} roughness={0.17} clearcoat={0.32} /></mesh>
      <mesh position={[0.22, 0.21, -0.025]}><cylinderGeometry args={[0.022, 0.018, 0.1, 16]} /><meshPhysicalMaterial color="#b7bcba" metalness={0.96} roughness={0.17} clearcoat={0.32} /></mesh>
    </group>
  );
}

function Cooktop({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh receiveShadow>
        <boxGeometry args={[0.66, 0.026, 0.4]} />
        <meshStandardMaterial color="#111312" metalness={0.2} roughness={0.16} />
      </mesh>
      {[-0.2, 0.2].flatMap((x) => [-0.105, 0.105].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.025, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.075, 0.008, 10, 24]} />
          <meshStandardMaterial color="#8a8e8d" metalness={0.8} roughness={0.28} />
        </mesh>
      )))}
    </group>
  );
}

function Oven({ position, width }: { position: [number, number, number]; width: number }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[width, 0.5, 0.035]} />
        <meshStandardMaterial color="#151716" metalness={0.48} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.16, 0.025]}>
        <boxGeometry args={[width * 0.74, 0.025, 0.025]} />
        <meshStandardMaterial color="#b7bbba" metalness={0.9} roughness={0.18} />
      </mesh>
    </group>
  );
}

function WineCellar({ position, width }: { position: [number, number, number]; width: number }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[width, 0.56, 0.035]} />
        <meshStandardMaterial color="#1b1d1c" metalness={0.24} roughness={0.22} />
      </mesh>
      {[-0.16, -0.05, 0.06, 0.17].map((y) => <mesh key={y} position={[0, y, 0.025]}><boxGeometry args={[width * 0.76, 0.008, 0.018]} /><meshStandardMaterial color="#8e9291" metalness={0.84} roughness={0.22} /></mesh>)}
    </group>
  );
}

function KitchenShelves({ width, finish }: { width: number; finish: StudioFinish }) {
  return (
    <group position={[0, 1.42, -0.25]}>
      {[0, 0.36].map((y) => <mesh key={y} castShadow position={[0, y, 0]}><boxGeometry args={[width, 0.055, 0.28]} /><FinishMaterial finish={finish} /></mesh>)}
    </group>
  );
}

function WarmStrip({ width, position }: { width: number; position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh><boxGeometry args={[width, 0.026, 0.026]} /><meshStandardMaterial color="#f0bf73" emissive="#e6a74e" emissiveIntensity={3.2} /></mesh>
      <pointLight position={[0, -0.15, 0.35]} intensity={8} distance={3.5} color="#efb96a" />
    </group>
  );
}

function GrillModel({ config }: { config: StudioConfig }) {
  const width = config.format === 'completa' ? config.width : Math.max(1.25, config.width * 0.82);
  const bodyDepth = Math.min(config.depth, 0.92);
  const mobile = config.format === 'movil' || config.modules.ruedas;
  const baseY = mobile ? 0.17 : 0.04;
  const cabinetHeight = Math.max(0.55, config.height - 0.12);
  const cabinetTop = baseY + cabinetHeight;
  const fireboxY = cabinetTop + 0.16;
  const doorWidth = width / 2 - 0.095;

  return (
    <group>
      <RoundedBox castShadow receiveShadow args={[width, cabinetHeight, bodyDepth]} radius={0.025} smoothness={5} position={[0, baseY + cabinetHeight / 2, 0]}>
        <FinishMaterial finish={config.finish} offset={0.08} />
      </RoundedBox>

      <mesh castShadow position={[0, cabinetTop + 0.025, 0]}>
        <boxGeometry args={[width + 0.05, 0.065, bodyDepth + 0.05]} />
        <meshPhysicalMaterial color="#171918" metalness={0.74} roughness={0.3} clearcoat={0.25} />
      </mesh>

      {config.modules.puertas !== false ? (
        <>
          <GrillMeshDoor width={doorWidth} height={cabinetHeight * 0.72} position={[-width / 4, baseY + cabinetHeight * 0.46, bodyDepth / 2 + 0.026]} />
          <GrillMeshDoor width={doorWidth} height={cabinetHeight * 0.72} position={[width / 4, baseY + cabinetHeight * 0.46, bodyDepth / 2 + 0.026]} />
          <mesh position={[0, baseY + cabinetHeight * 0.36, 0]} receiveShadow>
            <boxGeometry args={[width * 0.84, 0.035, bodyDepth * 0.7]} />
            <meshStandardMaterial color="#242625" metalness={0.6} roughness={0.42} />
          </mesh>
        </>
      ) : null}

      <RoundedBox castShadow args={[width * 0.9, 0.27, bodyDepth * 0.78]} radius={0.025} smoothness={5} position={[0, fireboxY, 0]}>
        <meshPhysicalMaterial color="#343736" metalness={0.9} roughness={0.2} clearcoat={0.38} clearcoatRoughness={0.2} />
      </RoundedBox>
      <mesh castShadow position={[0, fireboxY, bodyDepth * 0.405]}>
        <boxGeometry args={[width * 0.84, 0.21, 0.026]} />
        <meshPhysicalMaterial color="#777c7a" metalness={0.94} roughness={0.24} clearcoat={0.2} />
      </mesh>
      <GrillBadge position={[-width * 0.27, fireboxY, bodyDepth * 0.425]} />

      <GrillWindGuard width={width * 0.94} depth={bodyDepth * 0.78} y={fireboxY + 0.24} finish={config.finish} />
      {config.modules.brasero !== false ? <EmberBed width={width * 0.74} depth={bodyDepth * 0.48} y={fireboxY + 0.19} /> : null}
      {config.modules.parrilla ? <GrillGrates width={width * (config.modules.plancha ? 0.51 : 0.8)} depth={bodyDepth * 0.62} position={[config.modules.plancha ? width * 0.13 : 0, fireboxY + 0.32, 0]} /> : null}
      {config.modules.plancha ? (
        <RoundedBox castShadow args={[width * 0.25, 0.035, bodyDepth * 0.61]} radius={0.018} smoothness={4} position={[-width * 0.29, fireboxY + 0.32, 0]}>
          <meshPhysicalMaterial color="#272a29" metalness={0.82} roughness={0.34} clearcoat={0.18} />
        </RoundedBox>
      ) : null}
      {config.modules.lavaplatos ? <Sink position={[width * 0.32, fireboxY + 0.34, 0]} /> : null}
      {config.modules.asador ? <Rotisserie width={width * 0.76} y={fireboxY + 0.67} /> : null}
      {mobile ? [-1, 1].flatMap((x) => [-1, 1].map((z) => <Wheel key={`${x}-${z}`} position={[x * width * 0.4, 0.105, z * bodyDepth * 0.35]} />)) : null}
    </group>
  );
}

function GrillWindGuard({ width, depth, y, finish }: { width: number; depth: number; y: number; finish: StudioFinish }) {
  return (
    <group position={[0, y, 0]}>
      <mesh castShadow position={[0, 0.12, -depth / 2]}><boxGeometry args={[width, 0.38, 0.035]} /><FinishMaterial finish={finish} /></mesh>
      {[-1, 1].map((side) => <mesh key={side} castShadow position={[side * width / 2, 0.08, 0]}><boxGeometry args={[0.035, 0.32, depth]} /><FinishMaterial finish={finish} /></mesh>)}
    </group>
  );
}

function GrillGrates({ width, depth, position }: { width: number; depth: number; position: [number, number, number] }) {
  const bars = Math.max(18, Math.round(width / 0.045));
  return (
    <group position={position}>
      {Array.from({ length: bars }).map((_, index) => (
        <mesh key={index} castShadow position={[-width / 2 + (index / (bars - 1)) * width, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, depth, 12]} />
          <meshPhysicalMaterial color="#c7cac9" metalness={0.98} roughness={0.16} clearcoat={0.35} />
        </mesh>
      ))}
      {[-1, 1].map((side) => <mesh key={side} position={[side * width / 2, -0.005, 0]}><boxGeometry args={[0.035, 0.045, depth + 0.05]} /><meshStandardMaterial color="#242625" metalness={0.82} roughness={0.28} /></mesh>)}
      {[-1, 1].map((side) => <mesh key={side} position={[0, -0.005, side * depth / 2]}><boxGeometry args={[width + 0.05, 0.045, 0.035]} /><meshStandardMaterial color="#242625" metalness={0.82} roughness={0.28} /></mesh>)}
    </group>
  );
}

function GrillMeshDoor({ width, height, position }: { width: number; height: number; position: [number, number, number] }) {
  const meshWidth = width * 0.82;
  const meshHeight = height * 0.78;
  const diagonalLength = Math.min(meshHeight * 0.78, meshWidth * 0.82);
  return (
    <group position={position}>
      <mesh position={[0, 0, -0.018]}><boxGeometry args={[width, height, 0.026]} /><meshStandardMaterial color="#111312" metalness={0.78} roughness={0.36} /></mesh>
      {[-1, 1].map((x) => <mesh key={`v-${x}`} position={[x * width * 0.45, 0, 0.018]}><boxGeometry args={[0.045, height, 0.035]} /><meshStandardMaterial color="#232625" metalness={0.82} roughness={0.3} /></mesh>)}
      {[-1, 1].map((y) => <mesh key={`h-${y}`} position={[0, y * height * 0.45, 0.018]}><boxGeometry args={[width, 0.045, 0.035]} /><meshStandardMaterial color="#232625" metalness={0.82} roughness={0.3} /></mesh>)}
      {Array.from({ length: 7 }).flatMap((_, index) => [-1, 1].map((direction) => (
        <mesh key={`${index}-${direction}`} position={[-meshWidth * 0.24 + (index / 6) * meshWidth * 0.48, 0, 0.024]} rotation={[0, 0, direction * 0.57]}>
          <boxGeometry args={[0.013, diagonalLength, 0.012]} />
          <meshStandardMaterial color="#4b4e4d" metalness={0.88} roughness={0.27} />
        </mesh>
      )))}
      <DoorHandle y={height * 0.34} />
    </group>
  );
}

function DoorHandle({ y }: { y: number }) {
  return (
    <group position={[0, y, 0.085]}>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.022, 0.022, 0.28, 16]} /><meshPhysicalMaterial color="#aeb2b0" metalness={0.96} roughness={0.18} clearcoat={0.28} /></mesh>
      {[-1, 1].map((x) => <mesh key={x} position={[x * 0.12, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.018, 0.018, 0.085, 12]} /><meshStandardMaterial color="#8c918f" metalness={0.94} roughness={0.2} /></mesh>)}
    </group>
  );
}

function GrillBadge({ position }: { position: [number, number, number] }) {
  const symbol = useTexture('/brand/elema-logo-transparent.png');

  return (
    <mesh position={position}>
      <planeGeometry args={[0.105, 0.1]} />
      <meshBasicMaterial map={symbol} transparent alphaTest={0.08} toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

function EmberBed({ width, depth, y }: { width: number; depth: number; y: number }) {
  return (
    <group position={[0, y, 0]}>
      <mesh><boxGeometry args={[width, 0.035, depth]} /><meshStandardMaterial color="#111211" roughness={0.78} /></mesh>
      {Array.from({ length: 11 }).map((_, index) => (
        <mesh key={index} position={[-width * 0.42 + (index / 10) * width * 0.84, 0.025, ((index % 3) - 1) * depth * 0.22]} rotation={[Math.PI / 2, 0, index * 0.34]}>
          <cylinderGeometry args={[0.025, 0.035, 0.13, 8]} />
          <meshStandardMaterial color="#4a2920" emissive="#9f3515" emissiveIntensity={0.55} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Rotisserie({ width, y }: { width: number; y: number }) {
  return (
    <group position={[0, y, 0.02]} rotation={[0, 0, Math.PI / 2]}>
      <mesh><cylinderGeometry args={[0.018, 0.018, width, 16]} /><meshStandardMaterial color="#c4c6c4" metalness={0.95} roughness={0.16} /></mesh>
      <mesh position={[0, width / 2 + 0.08, 0]}><cylinderGeometry args={[0.055, 0.055, 0.15, 18]} /><meshStandardMaterial color="#282b2a" metalness={0.68} roughness={0.35} /></mesh>
    </group>
  );
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.095, 0.095, 0.062, 22]} /><meshStandardMaterial color="#111312" metalness={0.42} roughness={0.5} /></mesh>
      <mesh position={[0, 0, 0.034]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.032, 0.032, 0.07, 16]} /><meshStandardMaterial color="#858a88" metalness={0.92} roughness={0.22} /></mesh>
      <mesh position={[0, 0.09, 0]}><boxGeometry args={[0.045, 0.12, 0.045]} /><meshStandardMaterial color="#4b4e4d" metalness={0.86} roughness={0.3} /></mesh>
    </group>
  );
}

function HoodModel({ config }: { config: StudioConfig }) {
  const width = config.width;
  const depth = Math.min(config.depth, 0.8);
  const canopyY = Math.max(1.65, config.height);
  const integrated = config.format === 'integrada';
  const mural = config.format === 'mural';

  return (
    <group>
      {mural ? <HoodWall width={Math.max(3.4, width * 1.9)} /> : null}
      <RoundedBox castShadow args={[width, integrated ? 0.16 : 0.28, depth]} radius={0.035} smoothness={6} position={[0, canopyY, 0]}>
        <FinishMaterial finish={config.finish} />
      </RoundedBox>
      <RoundedBox args={[width * 0.92, 0.025, depth * 0.82]} radius={0.018} smoothness={4} position={[0, canopyY - (integrated ? 0.095 : 0.165), 0]}>
        <meshPhysicalMaterial color="#121413" metalness={0.72} roughness={0.24} clearcoat={0.32} />
      </RoundedBox>
      <HoodPerimeter width={width * 0.84} depth={depth * 0.72} y={canopyY - (integrated ? 0.114 : 0.184)} />
      {!integrated ? (
        <RoundedBox castShadow args={[Math.max(0.34, width * 0.27), 1.25, Math.max(0.28, depth * 0.52)]} radius={0.025} smoothness={5} position={[0, canopyY + 0.72, mural ? -depth * 0.21 : 0]}>
          <FinishMaterial finish={config.finish} offset={0.05} />
        </RoundedBox>
      ) : null}
      {config.format === 'suspendida' ? [-1, 1].map((x) => <mesh key={x} position={[x * width * 0.38, canopyY + 1.04, 0]}><cylinderGeometry args={[0.007, 0.007, 1.82, 10]} /><meshStandardMaterial color="#8f9492" metalness={0.94} roughness={0.18} /></mesh>) : null}
      {config.modules.filtros ? <HoodFilters width={width * 0.66} depth={depth * 0.5} y={canopyY - (integrated ? 0.13 : 0.2)} /> : null}
      {config.modules.luz ? <HoodLights width={width * 0.7} depth={depth * 0.58} y={canopyY - (integrated ? 0.14 : 0.21)} /> : null}
      {config.modules.panel ? <HoodControl position={[width * 0.31, canopyY - (integrated ? 0.14 : 0.21), depth * 0.24]} /> : null}
      {config.modules.repisa ? <RoundedBox castShadow args={[Math.min(width * 1.08, 2.6), 0.055, 0.34]} radius={0.018} smoothness={4} position={[0, 1.08, -0.54]}><FinishMaterial finish={config.finish} /></RoundedBox> : null}
      <ContextCounter width={Math.max(2.2, width * 1.55)} finish={config.finish} />
    </group>
  );
}

function HoodFilters({ width, depth, y }: { width: number; depth: number; y: number }) {
  return (
    <group position={[0, y, 0]}>
      {[-0.34, 0, 0.34].map((x) => (
        <group key={x} position={[x * width, 0, 0]}>
          <mesh><boxGeometry args={[width * 0.29, 0.018, depth]} /><meshStandardMaterial color="#767b79" metalness={0.9} roughness={0.29} /></mesh>
          {Array.from({ length: 6 }).map((_, index) => <mesh key={index} position={[0, -0.012, -depth * 0.36 + index * depth * 0.145]}><boxGeometry args={[width * 0.24, 0.009, 0.012]} /><meshStandardMaterial color="#242625" metalness={0.76} roughness={0.34} /></mesh>)}
        </group>
      ))}
    </group>
  );
}

function HoodPerimeter({ width, depth, y }: { width: number; depth: number; y: number }) {
  const material = <meshPhysicalMaterial color="#c4c8c6" metalness={0.96} roughness={0.17} clearcoat={0.34} />;
  return (
    <group position={[0, y, 0]}>
      {[-1, 1].map((z) => <mesh key={`z-${z}`} position={[0, 0, z * depth / 2]}><boxGeometry args={[width, 0.025, 0.022]} />{material}</mesh>)}
      {[-1, 1].map((x) => <mesh key={`x-${x}`} position={[x * width / 2, 0, 0]}><boxGeometry args={[0.022, 0.025, depth]} />{material}</mesh>)}
    </group>
  );
}

function HoodLights({ width, depth, y }: { width: number; depth: number; y: number }) {
  return (
    <group position={[0, y, 0]}>
      {[-1, 1].map((z) => (
        <group key={z} position={[0, 0, z * depth / 2]}>
          <mesh><boxGeometry args={[width, 0.018, 0.018]} /><meshStandardMaterial color="#ffdca1" emissive="#e9aa4c" emissiveIntensity={3.8} /></mesh>
          <pointLight position={[0, -0.2, 0]} intensity={4.5} distance={2.6} color="#efbb70" />
        </group>
      ))}
    </group>
  );
}

function HoodControl({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh><boxGeometry args={[0.22, 0.018, 0.075]} /><meshPhysicalMaterial color="#0f1110" metalness={0.5} roughness={0.18} clearcoat={0.5} /></mesh>
      {[-0.06, 0, 0.06].map((x) => <mesh key={x} position={[x, -0.012, 0]}><cylinderGeometry args={[0.009, 0.009, 0.012, 14]} /><meshStandardMaterial color="#d3d6d4" emissive="#d3d6d4" emissiveIntensity={0.5} /></mesh>)}
    </group>
  );
}

function HoodWall({ width }: { width: number }) {
  return <mesh receiveShadow position={[0, 1.55, -0.7]}><boxGeometry args={[width, 3.1, 0.08]} /><meshStandardMaterial color="#b9b2a8" roughness={0.72} /></mesh>;
}

function ContextCounter({ width, finish }: { width: number; finish: StudioFinish }) {
  return (
    <group>
      <RoundedBox castShadow receiveShadow args={[width, 0.82, 0.78]} radius={0.018} smoothness={4} position={[0, 0.41, 0]}><FinishMaterial finish={finish} offset={0.1} /></RoundedBox>
      {[-0.31, 0, 0.31].map((x) => <mesh key={x} position={[x * width, 0.43, 0.405]}><boxGeometry args={[width * 0.29, 0.72, 0.018]} /><FinishMaterial finish={finish} offset={0.02} /></mesh>)}
      <RoundedBox castShadow args={[width + 0.06, 0.075, 0.84]} radius={0.018} smoothness={4} position={[0, 0.87, 0]}><StoneMaterial /></RoundedBox>
      <Cooktop position={[0, 0.925, 0]} />
    </group>
  );
}
