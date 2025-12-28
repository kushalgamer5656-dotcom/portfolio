import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { LayoutTextFlip } from './ui/LayoutTextFlip';
import { TextRevealCard } from './ui/TextRevealCard';
import ThreeErrorBoundary from './ThreeErrorBoundary';

const Scene3D = React.lazy(() => import('./Scene3D'));

const Hero: React.FC = () => {
    return (
        <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between bg-cyber-black px-6 md:px-12 lg:px-24 py-12 lg:py-0">

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-secondary/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Left Content: Intro, Roles, Buttons */}
            <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 space-y-8 pt-20 lg:pt-0">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <h2 className="text-xl md:text-2xl text-gray-400 font-light mb-2 tracking-wide">
                        Hello, It's Me
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-cyber-primary via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                            KUSHAL KHANAL
                        </span>
                    </h1>

                    <div className="flex flex-col md:flex-row items-center lg:items-start gap-3 text-2xl md:text-3xl font-medium text-white/90 mb-8">
                        <span>I'm a</span>
                        <LayoutTextFlip
                            text=""
                            words={["Data Scientist", "AI Engineer", "Software Engineer", "Problem Solver", "Tech Visionary"]}
                            duration={3000}
                        />
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10 mx-auto lg:mx-0">
                        Bridging the gap between complex data algorithms and intuitive user experiences.
                        Building the future, one line of code at a time.
                    </p>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,240,255,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-cyber-primary text-black font-bold uppercase tracking-widest rounded-sm transition-all duration-300"
                        >
                            View Projects
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-transparent border border-cyber-primary/50 text-cyber-primary font-bold uppercase tracking-widest hover:border-cyber-primary transition-all duration-300 rounded-sm"
                        >
                            Contact Me
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Right Content: 3D Scene & Chemistry Card */}
            <div className="relative w-full lg:w-1/2 h-full flex flex-col items-center justify-center lg:justify-end mt-12 lg:mt-0">
                {/* 3D Scene Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full h-[350px] md:h-[450px] lg:h-[500px] relative z-10"
                >
                    <ThreeErrorBoundary>
                        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-500">Loading 3D Experience...</div>}>
                            <Scene3D />
                        </Suspense>
                    </ThreeErrorBoundary>
                </motion.div>

                {/* Text Reveal Card - Positioned below 3D scene but within right column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative z-20 -mt-10 lg:-mt-20 w-full flex justify-center"
                >
                    <TextRevealCard
                        text="You know the business"
                        revealText="I know the chemistry"
                        className="bg-transparent border-none shadow-none p-0 scale-75 md:scale-90"
                    />
                </motion.div>
            </div>

        </section>
    );
};

export default Hero;
