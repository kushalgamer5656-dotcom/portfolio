import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Correct relative imports (these work ONLY if this file is inside /src)
import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import TeenPatti from './pages/TeenPatti';
import ChatBot from './components/ChatBot';
import IntroAnimation from './components/IntroAnimation';

import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    // if (!hasSeenIntro) {
    setShowIntro(true);
    // }
  }, []);

  const handleIntroFinish = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <HashRouter>
      <ErrorBoundary>
        <div className="min-h-screen bg-cyber-black text-white selection:bg-cyber-primary selection:text-black overflow-x-hidden relative">

          <AnimatePresence>
            {showIntro && (
              <motion.div
                key="intro"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed inset-0 z-[100]"
              >
                <IntroAnimation onFinish={handleIntroFinish} />
              </motion.div>
            )}
          </AnimatePresence>

          {!showIntro && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full"
            >
              <main className="transition-opacity duration-500 ease-in-out w-full max-w-[100vw] overflow-hidden">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/teenpatti" element={<TeenPatti />} />
                </Routes>
              </main>

              <ChatBot />

              <footer className="py-6 text-center text-gray-600 text-sm border-t border-gray-900 mt-12 bg-black/50 backdrop-blur-sm relative z-10">
                <p>&copy; {new Date().getFullYear()} Kushal Khanal. All rights reserved.</p>
                <p className="text-xs mt-1">Built with React & Gemini AI</p>
              </footer>
            </motion.div>
          )}
        </div>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;
