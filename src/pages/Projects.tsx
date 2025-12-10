import React from 'react';
import { Project } from '../types';
import { Github, ExternalLink, Play } from 'lucide-react';

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "AI Image Recognition System",
      description: "Developed a convolutional neural network (CNN) capable of classifying images with 98% accuracy. Used primarily for medical imaging analysis.",
      technologies: ["Python", "TensorFlow", "OpenCV", "React"],
      link: "#"
    },
    {
      title: "Automated Trading Bot",
      description: "A Python-based bot that analyzes market trends using historical data and executes trades. Features real-time sentiment analysis from news sources.",
      technologies: ["Python", "Pandas", "Scikit-learn", "API Integration"],
      link: "#"
    },
    {
      title: "Voice Assistant 2.0",
      description: "An advanced voice assistant utilizing NLP to understand context-aware commands. Integrated with home automation systems.",
      technologies: ["Python", "NLTK", "SpeechRecognition", "IoT"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
       <div className="mb-12 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">MY PROJECTS</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my journey in Artificial Intelligence and Software Engineering.
          </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className="group relative bg-cyber-dark border border-gray-800 hover:border-cyber-primary/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]">
            {/* Visual Header (Placeholder for project image) */}
            <div className="h-48 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://picsum.photos/600/300')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
               <div className="z-10 bg-black/50 p-3 rounded-full border border-cyber-primary/30 group-hover:scale-110 transition-transform">
                 <Play className="w-8 h-8 text-cyber-primary fill-cyber-primary/20" />
               </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-gray-800 text-cyber-primary/80 border border-gray-700">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                 <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                   <Github className="w-4 h-4" /> Code
                 </a>
                 <a href={project.link || "#"} className="flex items-center gap-2 text-sm text-cyber-primary hover:text-cyber-secondary transition-colors font-semibold">
                   Live Demo <ExternalLink className="w-4 h-4" />
                 </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;