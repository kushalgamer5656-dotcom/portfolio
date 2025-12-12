
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050505); // Deep space black
        scene.fog = new THREE.FogExp2(0x050505, 0.002); // Light fog for depth

        // Camera Setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 20;

        // Renderer Setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Objects Container
        const objects: THREE.Mesh[] = [];

        // Helper to create random floats
        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        // 1. Neon Cyan Icosahedrons (Crystals)
        const geometry1 = new THREE.IcosahedronGeometry(1, 0);
        const material1 = new THREE.MeshPhongMaterial({
            color: 0x00FFFF, // Neon Cyan
            shininess: 100,
            wireframe: true,
            transparent: true,
            opacity: 0.8,
        });

        for (let i = 0; i < 15; i++) {
            const mesh = new THREE.Mesh(geometry1, material1);
            mesh.position.set(random(-30, 30), random(-30, 30), random(-30, 10));
            mesh.rotation.set(random(0, Math.PI), random(0, Math.PI), 0);
            const scale = random(0.5, 2);
            mesh.scale.set(scale, scale, scale);
            scene.add(mesh);
            objects.push(mesh);
        }

        // 2. Electric Blue Spheres (Particles)
        const geometry2 = new THREE.SphereGeometry(0.2, 16, 16);
        const material2 = new THREE.MeshStandardMaterial({
            color: 0x007FFF, // Electric Blue
            emissive: 0x007FFF,
            emissiveIntensity: 0.5,
        });

        for (let i = 0; i < 50; i++) {
            const mesh = new THREE.Mesh(geometry2, material2);
            mesh.position.set(random(-40, 40), random(-40, 40), random(-20, 20));
            scene.add(mesh);
            objects.push(mesh);
        }

        // 3. Violet Torus Knots (Abstract Shapes)
        const geometry3 = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        const material3 = new THREE.MeshStandardMaterial({
            color: 0x8A2BE2, // Violet
            roughness: 0.1,
            metalness: 0.5,
        });

        for (let i = 0; i < 5; i++) {
            const mesh = new THREE.Mesh(geometry3, material3);
            mesh.position.set(random(-20, 20), random(-20, 20), random(-10, 10));
            mesh.rotation.set(random(0, Math.PI), random(0, Math.PI), 0);
            const scale = random(1, 3);
            mesh.scale.set(scale, scale, scale);
            scene.add(mesh);
            objects.push(mesh);
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x00FFFF, 1, 50);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x8A2BE2, 1, 50);
        pointLight2.position.set(-10, -10, 10);
        scene.add(pointLight2);

        // Animation variables
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        };

        document.addEventListener('mousemove', onDocumentMouseMove);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            // Visual Parallax
            scene.rotation.y += 0.05 * (targetX - scene.rotation.y);
            scene.rotation.x += 0.05 * (targetY - scene.rotation.x);

            // Gentle object movement
            objects.forEach((obj, i) => {
                obj.rotation.x += 0.001 * (i % 2 === 0 ? 1 : -1);
                obj.rotation.y += 0.002;

                // Floating effect
                obj.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
            });

            // Scroll Parallax
            const scrollY = window.scrollY;
            camera.position.y = scrollY * -0.01;


            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            // Dispose geometries and materials if needed for strict cleanup
            geometry1.dispose();
            material1.dispose();
            geometry2.dispose();
            material2.dispose();
            geometry3.dispose();
            material3.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
        />
    );
};

export default ThreeBackground;
