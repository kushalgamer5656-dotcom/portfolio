import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { TextRevealCard } from './ui/TextRevealCard';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils'; // Adjust path if needed

interface WelcomeScreenProps {
    onEnter: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
    // Slider state
    const x = useMotionValue(0);
    const xInput = [-10, 260]; // Range of the slider track
    const backgroundOpacity = useTransform(x, xInput, [1, 0]); // Fade out track as we slide
    const handleOpacity = useTransform(x, xInput, [1, 0.5]);

    // Create a completion threshold
    const handleDragEnd = () => {
        if (x.get() > 200) {
            onEnter();
        } else {
            // Reset if not pulled enough (animates back automatically by drag constraints usually, but explicit reset helpful)
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cyber-black text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -500, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-dark to-black opacity-80 pointer-events-none" />

            <div className="z-10 flex flex-col items-center gap-12">

                {/* The Text Reveal Card provided by user */}
                <TextRevealCard
                    text="You know the business" // Or "Hover to reveal"
                    revealText="I know the chemistry " // Or "Welcome to Future"
                    className="w-[80vw] max-w-2xl border-white/10"
                >
                    <div className="mb-4">
                        <h2 className="text-xl text-cyber-primary font-bold tracking-widest uppercase">System Initialization</h2>
                    </div>
                </TextRevealCard>

                {/* The "Slide to Open" Slider */}
                <div className="relative w-[300px] h-16 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 flex items-center px-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    {/* Track Text */}
                    <motion.span
                        style={{ opacity: backgroundOpacity }}
                        className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-sm tracking-[0.2em] pointer-events-none uppercase"
                    >
                        Slide to Enter
                    </motion.span>

                    {/* Draggable Handle */}
                    <motion.div
                        className="w-12 h-12 bg-cyber-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.6)] cursor-grab active:cursor-grabbing z-20"
                        drag="x"
                        dragConstraints={{ left: 0, right: 240 }}
                        dragElastic={0.1}
                        dragSnapToOrigin={true} // Snaps back if not completed, we handle success in onDragEnd
                        style={{ x }}
                        onDragEnd={handleDragEnd}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowRight className="text-black w-6 h-6" />
                    </motion.div>
                </div>

                {/* Instruction for accessibility/clarity */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1 }}
                    className="text-white/30 text-xs font-mono mt-4"
                >
                    Move cursor over card to reveal • Slide button to enter
                </motion.p>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;
