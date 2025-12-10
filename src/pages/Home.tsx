import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { Page } from '../types';

interface HomeProps {
  setPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-secondary/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

      <div className="text-center max-w-4xl z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary text-sm font-bold tracking-widest mb-6 animate-fade-in-down">
          <span className="w-2 h-2 rounded-full bg-cyber-primary animate-ping"></span>
          AI ENGINEER & TECH ENTHUSIAST
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyber-primary to-cyber-secondary mb-6 leading-tight drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
          KUSHAL KHANAL
        </h1>

        <div className="flex flex-col items-center gap-4 mb-10">
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
            Engineering the future through <span className="text-white font-semibold">Artificial Intelligence</span> and <span className="text-white font-semibold">Machine Learning</span>.
          </p>
          <div className="bg-black/40 border border-gray-800 rounded-lg p-3 font-mono text-sm text-gray-400 mt-2 flex items-center gap-3">
             <Terminal className="w-4 h-4 text-cyber-primary" />
             <span>print("Hello, World! I am an AI Engineer.")</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => setPage(Page.PROJECTS)}
            className="group relative px-8 py-4 bg-transparent border-2 border-cyber-primary text-cyber-primary font-bold uppercase tracking-widest hover:bg-cyber-primary hover:text-black transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-cyber-primary/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
          </button>
          
          <button 
             onClick={() => setPage(Page.CONTACT)}
             className="px-8 py-4 bg-cyber-secondary/20 border border-cyber-secondary/50 text-white font-bold uppercase tracking-widest hover:bg-cyber-secondary hover:border-cyber-secondary transition-all duration-300 shadow-[0_0_20px_rgba(112,0,255,0.3)] hover:shadow-[0_0_30px_rgba(112,0,255,0.6)]"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;