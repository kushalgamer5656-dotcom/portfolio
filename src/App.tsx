import React, { useState, useRef } from 'react';

// Correct relative imports (these work ONLY if this file is inside /src)
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import SnowOverlay from './components/SnowOverlay';
import ChatBot from './components/ChatBot';

import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [showSnow, setShowSnow] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      setShowSnow(prev => !prev);
    }, 3000);
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchStart = () => handleMouseDown();
  const handleTouchEnd = () => handleMouseUp();

  return (
    <div
      className="min-h-screen bg-cyber-black text-white selection:bg-cyber-primary selection:text-black"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <SnowOverlay active={showSnow} />

      <Navigation activePage={activePage} setActivePage={setActivePage} />

      <main className="transition-opacity duration-500 ease-in-out">
        {activePage === Page.HOME && <Home setPage={setActivePage} />}
        {activePage === Page.RESUME && <Resume />}
        {activePage === Page.PROJECTS && <Projects />}
        {activePage === Page.CONTACT && <Contact />}
      </main>

      <ChatBot />

      <footer className="py-6 text-center text-gray-600 text-sm border-t border-gray-900 mt-12 bg-black/50 backdrop-blur-sm">
        <p>&copy; {new Date().getFullYear()} Kushal Khanal. All rights reserved.</p>
        <p className="text-xs mt-1">Built with React & Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
