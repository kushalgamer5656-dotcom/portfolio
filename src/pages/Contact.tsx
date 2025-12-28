import React from 'react';
import { Mail, Facebook, MapPin, Send, Github, Linkedin } from 'lucide-react';
import profileImage from '../assets/profile.jpg';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
   return (
      <div className="min-h-screen pt-24 pb-20 px-4 flex items-center bg-cyber-black relative overflow-hidden">

         {/* Background Decor */}
         <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyber-primary/5 blur-[120px] rounded-full pointer-events-none" />

         <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">

            {/* Left: Contact Info & Photo */}
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="space-y-8"
            >
               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-2xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="relative bg-[#0a0b10] rounded-2xl p-2 border border-white/5">
                     {/* User Profile Image */}
                     <img
                        src={profileImage}
                        alt="Kushal Khanal"
                        className="w-full h-[400px] object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500 will-change-transform"
                     />
                     <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg">
                        <h3 className="text-xl font-bold text-white">Kushal Khanal</h3>
                        <p className="text-cyber-primary text-sm font-medium tracking-wider">AI ENGINEER & DATA SCIENTIST</p>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <a href="mailto:kushalgamer5656@gmail.com" className="flex flex-col gap-2 p-5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyber-primary/30 transition-all rounded-xl group">
                     <Mail className="w-6 h-6 text-gray-400 group-hover:text-cyber-primary transition-colors" />
                     <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                        <p className="text-white font-medium text-sm truncate">kushalgamer5656@gmail.com</p>
                     </div>
                  </a>

                  <a href="https://www.linkedin.com/in/kushal-khanal-499093394/" target="_blank" rel="noreferrer" className="flex flex-col gap-2 p-5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#0077b5] transition-all rounded-xl group">
                     <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-[#0077b5] transition-colors" />
                     <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">LinkedIn</p>
                        <p className="text-white font-medium text-sm">Connect Profile</p>
                     </div>
                  </a>

                  <a href="https://github.com/kushalgamer5656-dotcom" target="_blank" rel="noreferrer" className="flex flex-col gap-2 p-5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white transition-all rounded-xl group">
                     <Github className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                     <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">GitHub</p>
                        <p className="text-white font-medium text-sm">View Code</p>
                     </div>
                  </a>

                  <div className="flex flex-col gap-2 p-5 bg-white/5 border border-white/5 rounded-xl">
                     <MapPin className="w-6 h-6 text-cyber-secondary" />
                     <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                        <p className="text-white font-medium text-sm">Kirtipur, Kathmandu</p>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="bg-[#0c0d12] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative"
            >
               <h2 className="font-display text-4xl font-bold text-white mb-2">Let's Collaborate</h2>
               <p className="text-gray-400 mb-8 font-light">Have an AI project in mind or want to discuss the future of tech? Send me a signal.</p>

               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs text-cyber-primary font-bold tracking-widest uppercase">First Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:border-cyber-primary focus:bg-white/10 transition-all placeholder:text-gray-600" placeholder="John" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs text-cyber-primary font-bold tracking-widest uppercase">Last Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:border-cyber-primary focus:bg-white/10 transition-all placeholder:text-gray-600" placeholder="Doe" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs text-cyber-primary font-bold tracking-widest uppercase">Email Address</label>
                     <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:border-cyber-primary focus:bg-white/10 transition-all placeholder:text-gray-600" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs text-cyber-primary font-bold tracking-widest uppercase">Message</label>
                     <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:border-cyber-primary focus:bg-white/10 transition-all placeholder:text-gray-600 resize-none" placeholder="Tell me about your project..." />
                  </div>

                  <button className="w-full py-4 bg-cyber-primary text-black font-bold rounded-lg uppercase tracking-widest hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group">
                     <span className="relative z-10 flex items-center gap-2">Send Message <Send className="w-4 h-4" /></span>
                  </button>
               </form>
            </motion.div>

         </div>
      </div>
   );
};

export default Contact;