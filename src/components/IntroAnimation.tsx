import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sparkles, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import ThreeErrorBoundary from './ThreeErrorBoundary';

const IntroContent = ({ onComplete }: { onComplete: () => void }) => {
    const groupRef = useRef<THREE.Group>(null);
    const textRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3500); // 3.5s to give a bit more time
        return () => clearTimeout(timer);
    }, [onComplete]);

    useFrame((state) => {
        state.camera.position.lerp(new THREE.Vector3(0, 0, 6), 0.02);
        state.camera.lookAt(0, 0, 0);

        if (groupRef.current) {
            groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
        }
    });

    return (
        <>
            <color attach="background" args={['#000000']} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={300} scale={12} size={2} speed={0.4} opacity={0.5} color="#00f0ff" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
                    <Text
                        ref={textRef}
                        fontSize={1.5}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        fillOpacity={0}
                        strokeWidth={0.02}
                        strokeColor="#00f0ff"
                    >
                        KUSHAL KHANAL
                        <meshBasicMaterial attach="material" color="#ffffff" transparent opacity={0.1} />
                    </Text>

                    <Text
                        fontSize={1.52}
                        color="#00f0ff"
                        anchorX="center"
                        anchorY="middle"
                        fillOpacity={0.1}
                        strokeWidth={0}
                    >
                        KUSHAL KHANAL
                    </Text>
                </group>
            </Float>

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        </>
    );
};

const IntroAnimation = ({ onFinish }: { onFinish: () => void }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
        }, 3000);

        const finishTimer = setTimeout(() => {
            onFinish();
        }, 3500);

        return () => {
            clearTimeout(timer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <div className={`fixed inset-0 z-[100] bg-black transition-opacity duration-1000 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ThreeErrorBoundary>
                    <Suspense fallback={null}>
                        <IntroContent onComplete={() => { }} />
                    </Suspense>
                </ThreeErrorBoundary>
            </Canvas>
        </div>
    );
};

export default IntroAnimation;
