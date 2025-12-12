import React, { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThreeErrorBoundary from './ThreeErrorBoundary';

// Lazy load the 3D scene to prevent main bundle crashes if Three.js fails
const Scene3D = React.lazy(() => import('./Scene3D'));

const Hero: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

            {/* Left Column: Sticky Content */}
            <div className="relative z-10 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 md:px-12 lg:px-20 py-20 lg:h-screen lg:sticky lg:top-0">
                <div className="pointer-events-auto">
                    <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
                        <span className="w-8 h-[1px] bg-cyber-primary"></span>
                        <span className="text-cyber-primary font-mono text-sm tracking-widest uppercase">Kushal Khanal</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter text-white mb-8 animate-fade-in-up delay-100 mix-blend-difference">
                        Hello —<br />
                        it’s Kushal<br />
                        Khanal
                    </h1>

                    <p className="max-w-md text-gray-400 text-lg md:text-xl font-light mb-10 animate-fade-in-up delay-200">
                        Creative AI Engineer & Developer crafting immersive digital experiences through code and curiosity.
                    </p>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in-up delay-300">
                        <button
                            onClick={() => navigate('/projects')}
                            className="group px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyber-primary transition-colors duration-300"
                        >
                            View Work
                        </button>
                        <button
                            onClick={() => navigate('/contact')}
                            className="group px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest hover:border-white transition-colors duration-300 flex items-center gap-2"
                        >
                            Contact Me <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column: 3D Scene */}
            <div className="relative w-full h-[50vh] lg:h-screen lg:sticky lg:top-0 bg-transparent">
                <ThreeErrorBoundary>
                    <Suspense fallback={
                        <div className="w-full h-full flex items-center justify-center bg-cyber-black text-cyber-primary font-mono animate-pulse">
                            Loading Experience...
                        </div>
                    }>
                        <Scene3D />
                    </Suspense>
                </ThreeErrorBoundary>

                {/* Overlay gradient for better text readability on mobile if overlapping */}
                <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-cyber-black/50"></div>
            </div>

        </section>
    );
};

export default Hero;
