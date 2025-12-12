import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'RESUME', id: 'resume' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setActiveSection(id);
    }
  };

  // Optional: Highlight active section on scroll
  // (Simplified for now, as snap scroll keeps one section active)

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-primary/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => handleScrollTo('home')}>
            <Cpu className="w-8 h-8 text-cyber-primary animate-pulse-fast" />
            <span className="font-display font-bold text-xl tracking-widest text-white">
              KUSHAL<span className="text-cyber-primary">.AI</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScrollTo(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium tracking-wider transition-all duration-300 ${activeSection === item.id
                    ? 'text-cyber-black bg-cyber-primary shadow-[0_0_15px_rgba(0,240,255,0.7)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyber-primary hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cyber-dark border-b border-cyber-primary/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScrollTo(item.id)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${activeSection === item.id
                  ? 'text-cyber-primary bg-white/5 border-l-4 border-cyber-primary'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;