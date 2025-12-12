import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const MainObject = () => {
    const meshRef = useRef<THREE.Group>(null);
    const [active, setActive] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // "React when user hold": distinct visual change
            const targetScale = active ? 1.1 : 1;
            const currentScale = meshRef.current.scale.x;
            const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
            meshRef.current.scale.set(newScale, newScale, newScale);
        }
    });

    return (
        <group
            ref={meshRef}
            // Change state on interaction
            onPointerDown={() => setActive(true)}
            onPointerUp={() => setActive(false)}
            onPointerLeave={() => setActive(false)}
        >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Main Floating Object - Icosahedron */}
                <mesh position={[0, 0, 0]}>
                    <icosahedronGeometry args={[2, 0]} />
                    {/* React color change: Neon Cyan -> Electric Purple */}
                    <meshStandardMaterial
                        color={active ? "#7000ff" : "#00f0ff"}
                        roughness={0.1}
                        metalness={0.8}
                        wireframe
                    />
                </mesh>

                {/* Inner solid core for contrast */}
                <mesh position={[0, 0, 0]}>
                    <icosahedronGeometry args={[1.5, 0]} />
                    <meshStandardMaterial color="#000000" roughness={0.2} metalness={1} />
                </mesh>
            </Float>
        </group>
    );
};

const Scene3D = () => {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            {/* Studio Lighting Setup */}
            {/* Soft Fill Light */}
            <ambientLight intensity={0.7} />

            {/* Key Light (Directional) - Soft warm highlight */}
            <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />

            {/* Rim Light (Backlight) - Separates object from background */}
            <spotLight position={[-5, 5, -5]} intensity={1} color="#00f0ff" angle={0.5} penumbra={1} />

            <MainObject />

            {/* Interaction Controls:
          - enableZoom={false}: Keep the scene stable size
          - enablePan={false}: Keep object centered
          - autoRotate: Adds dynamic movement when idle (optional, set to true if desired)
      */}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={2} />

            {/* Studio Environment for realistic reflections */}
            <Environment preset="studio" />

            <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} color="#000000" />
        </Canvas>
    );
};

export default Scene3D;
