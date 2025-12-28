import React from 'react';
import { Project } from '../types';
import { Github, ExternalLink, Code2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "AI Image Recognition System",
      description: "Developed a convolutional neural network (CNN) capable of classifying images with 98% accuracy. Used primarily for medical imaging analysis to detect anomalies early.",
      technologies: ["Python", "TensorFlow", "OpenCV", "React"],
      link: "#"
    },
    {
      title: "Automated Trading Bot",
      description: "A Python-based bot that analyzes market trends using historical data and executes trades. Features real-time sentiment analysis from news sources to predict market movements.",
      technologies: ["Python", "Pandas", "Scikit-learn", "FastAPI"],
      link: "#"
    },
    {
      title: "Voice Assistant 2.0",
      description: "Advanced NLP voice assistant.",
      technologies: ["Python", "NLTK", "IoT"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-cyber-black relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyber-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-cyber-primary font-mono text-sm tracking-[0.3em] uppercase mb-4">Portfolio</h2>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">Work</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              A collection of projects exploring the intersection of Artificial Intelligence,
              Data Science, and Modern Web Engineering.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#0a0b10] border border-white/5 hover:border-cyber-primary/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] flex flex-col"
            >
              {/* Card Header Illustration/Icon as placeholder for image */}
              <div className="h-32 bg-gradient-to-br from-gray-900 to-black relative flex items-center justify-center p-4 border-b border-white/5 group-hover:from-gray-900 group-hover:to-[#0c1214] transition-colors">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyber-primary/10 transition-all duration-300">
                  <Code2 className="w-6 h-6 text-gray-400 group-hover:text-cyber-primary transition-colors" />
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-cyber-primary border border-cyber-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <a href="#" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-all group-hover:border-cyber-primary/30 border border-transparent">
                    <Github className="w-3.5 h-3.5" /> Source
                  </a>
                  <a href={project.link || "#"} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md bg-cyber-primary/10 hover:bg-cyber-primary/20 text-xs font-medium text-cyber-primary transition-all">
                    Live Demo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;