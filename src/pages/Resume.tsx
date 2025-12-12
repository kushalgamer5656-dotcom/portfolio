import React from 'react';
import { Download, GraduationCap, Code, Brain, Database, Briefcase } from 'lucide-react';

const Resume: React.FC = () => {
  const education = [
    {
      school: "NIET, Kupondole",
      degree: "B.Tech in Artificial Intelligence",
      year: "Present",
      description: "18-year-old AI Engineer student specializing in Deep Learning, Neural Networks, and Data Science algorithms."
    },
    {
      school: "Capitol Hill College",
      degree: "High School Diploma",
      year: "Completed",
      description: "Majored in Science with a focus on Computer Science and Mathematics."
    }
  ];

  /* Social Links for CV Header (Visible when printing) */
  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kushal-khanal-499093394/" },
    { name: "GitHub", url: "https://github.com/kushalgamer5656-dotcom" },
    { name: "Facebook", url: "https://www.facebook.com/kushal.khanal.391505" }
  ];

  const skills = [
    { name: "Python", level: 95 },
    { name: "TensorFlow / PyTorch", level: 85 },
    { name: "JavaScript / React", level: 80 },
    { name: "Data Analysis", level: 90 },
    { name: "Computer Vision", level: 75 },
    { name: "NLP", level: 70 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-6xl mx-auto print:pt-0 print:text-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6 print:border-gray-300">
        <div>
          <h2 className="font-display text-4xl font-bold text-white mb-2 print:text-black">KUSHAL KHANAL</h2>
          <p className="text-cyber-primary tracking-widest print:text-blue-600 font-bold">AI ENGINEER | 18 YEARS OLD</p>

          {/* Social Links shown in print mode or desktop */}
          <div className="flex gap-4 mt-2 text-sm text-gray-400 print:text-gray-600">
            {socialLinks.map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyber-primary underline">
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-cyber-primary/10 border border-cyber-primary/50 text-cyber-primary hover:bg-cyber-primary hover:text-black transition-all duration-300 font-bold tracking-wider print:hidden"
        >
          <Download className="w-5 h-5" /> DOWNLOAD CV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 print:block print:space-y-8">
        {/* Education Column */}
        <div>
          <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-8 print:text-black">
            <GraduationCap className="w-6 h-6 text-cyber-secondary print:text-blue-600" /> Education
          </h3>
          <div className="space-y-8">
            {education.map((edu, idx) => (
              <div key={idx} className="relative pl-8 border-l-2 border-gray-800 hover:border-cyber-primary transition-colors duration-300 print:border-gray-300">
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-cyber-primary print:border-blue-600 print:bg-white"></span>
                <div className="bg-white/5 p-6 rounded-r-lg hover:bg-white/10 transition-colors print:bg-transparent print:p-0 print:pl-4">
                  <span className="inline-block px-3 py-1 bg-cyber-secondary/20 text-cyber-secondary text-xs font-bold rounded mb-2 print:text-black print:bg-gray-200">
                    {edu.year}
                  </span>
                  <h4 className="text-xl font-bold text-white print:text-black">{edu.school}</h4>
                  <p className="text-cyber-primary font-medium mb-2">{edu.degree}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Column */}
        <div>
          <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-8">
            <Brain className="w-6 h-6 text-cyber-secondary" /> Technical Skills
          </h3>
          <div className="bg-black/30 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm">
            <div className="space-y-6">
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium flex items-center gap-2">
                      <Code className="w-4 h-4 text-cyber-primary" /> {skill.name}
                    </span>
                    <span className="text-cyber-primary">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyber-secondary to-cyber-primary"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <h4 className="flex items-center gap-2 text-white font-bold mb-4">
                <Briefcase className="w-4 h-4 text-cyber-primary" /> Areas of Interest
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Machine Learning", "Neural Networks", "Robotics", "Web Development", "Cloud Computing", "Python Automation"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded hover:text-white hover:bg-gray-700 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;