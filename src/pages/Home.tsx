import React from 'react';
import Hero from '../components/Hero';
import Resume from './Resume';
import Projects from './Projects';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    // Main Container: Natural height, free scroll
    // Unified Studio Background: Dark gradient simulating soft ambient light
    <div className="w-full bg-gradient-to-b from-cyber-black via-[#0f0f16] to-[#050510] text-gray-300">

      {/* Section 1: Hero */}
      <div id="home" className="w-full min-h-screen">
        <Hero />
      </div>

      {/* Section 2: Resume */}
      <div id="resume" className="w-full min-h-screen border-t border-white/5 bg-transparent">
        <Resume />
      </div>

      {/* Section 3: Projects */}
      <div id="projects" className="w-full min-h-screen border-t border-white/5 bg-transparent">
        <Projects />
      </div>

      {/* Section 4: Contact */}
      <div id="contact" className="w-full min-h-screen border-t border-white/5 bg-transparent">
        <Contact />
      </div>

    </div>
  );
};

export default Home;