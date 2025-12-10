import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-display text-cyber-primary drop-shadow-lg animate-pulse">
        Kushal Khanal
      </h1>

      <h2 className="text-2xl mt-2 font-semibold text-cyber-secondary">
        AI Engineer
      </h2>

      <p className="mt-6 text-lg max-w-xl">
        Building futuristic AI-powered systems, automation tools, and intelligent web experiences.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="/Kushal_CV.pdf"
          download
          className="px-6 py-3 bg-cyber-primary text-black rounded-xl font-bold hover:bg-cyber-secondary transition"
        >
          Download CV
        </a>
        <a
          href="mailto:kushalgamer5656@gmail.com"
          className="px-6 py-3 border border-cyber-primary rounded-xl hover:bg-cyber-primary hover:text-black transition"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}
