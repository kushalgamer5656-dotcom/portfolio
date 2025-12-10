import React from 'react';
import { Mail, Facebook, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Contact Info & Photo */}
        <div className="space-y-8">
           <div className="relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-2xl blur opacity-75"></div>
             <div className="relative bg-black rounded-2xl p-2">
                {/* Placeholder Image using Picsum since actual file attachment isn't possible in code generation */}
                <img 
                  src="https://picsum.photos/seed/kushal/600/700" 
                  alt="Kushal Khanal" 
                  className="w-full h-96 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-bold text-white">Kushal Khanal</h3>
                  <p className="text-cyber-primary text-sm">AI Engineer</p>
                </div>
             </div>
           </div>

           <div className="grid gap-4">
             <a href="mailto:kushalgamer5656@gmail.com" className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-gray-800 hover:border-cyber-primary transition-all rounded-lg group">
                <div className="p-3 bg-gray-900 rounded-full group-hover:text-cyber-primary text-gray-400 transition-colors">
                   <Mail className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm text-gray-400">Email Me</p>
                   <p className="text-white font-medium">kushalgamer5656@gmail.com</p>
                </div>
             </a>

             <a href="https://www.facebook.com/kushal.khanal.391505" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-gray-800 hover:border-cyber-secondary transition-all rounded-lg group">
                <div className="p-3 bg-gray-900 rounded-full group-hover:text-cyber-secondary text-gray-400 transition-colors">
                   <Facebook className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm text-gray-400">Connect on Facebook</p>
                   <p className="text-white font-medium">Kushal Khanal</p>
                </div>
             </a>

             <div className="flex items-center gap-4 p-4 bg-white/5 border border-gray-800 rounded-lg">
                <div className="p-3 bg-gray-900 rounded-full text-gray-400">
                   <MapPin className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm text-gray-400">Location</p>
                   <p className="text-white font-medium">Kupondole, Kathmandu</p>
                </div>
             </div>
           </div>
        </div>

        {/* Right: Form */}
        <div className="bg-cyber-dark/50 p-8 md:p-12 rounded-2xl border border-gray-800 backdrop-blur-sm shadow-xl">
           <h2 className="font-display text-3xl font-bold text-white mb-2">Get In Touch</h2>
           <p className="text-gray-400 mb-8">Have a project in mind or want to discuss AI? Send me a message.</p>

           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-sm text-cyber-primary font-medium tracking-wide">FIRST NAME</label>
                   <input type="text" className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm text-cyber-primary font-medium tracking-wide">LAST NAME</label>
                   <input type="text" className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all" placeholder="Doe" />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-sm text-cyber-primary font-medium tracking-wide">EMAIL ADDRESS</label>
                <input type="email" className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all" placeholder="john@example.com" />
             </div>

             <div className="space-y-2">
                <label className="text-sm text-cyber-primary font-medium tracking-wide">MESSAGE</label>
                <textarea rows={5} className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all" placeholder="Hello Kushal..." />
             </div>

             <button className="w-full py-4 bg-gradient-to-r from-cyber-secondary to-cyber-primary text-white font-bold rounded-lg uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> Send Message
             </button>
           </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;