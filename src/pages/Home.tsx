import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconHome, IconUser, IconBriefcase, IconMail, IconCards } from '@tabler/icons-react';
import { Sidebar, SidebarBody, SidebarLink } from '../components/ui/Sidebar';
import Hero from '../components/Hero';
import Resume from './Resume';
import Projects from './Projects';
import Contact from './Contact';
import { cn } from '../lib/utils';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const Home: React.FC = () => {
  // hasEntered is now always true because we removed the WelcomeScreen intro
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Home",
      href: "#home",
      icon: <IconHome className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Resume",
      href: "#resume",
      icon: <IconUser className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Projects",
      href: "#projects",
      icon: <IconBriefcase className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Contact",
      href: "#contact",
      icon: <IconMail className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "3 Patti",
      href: "/teenpatti",
      icon: <IconCards className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full h-screen bg-[#050508] overflow-hidden relative font-sans">

      {/* Main App Layout - Removed WelcomeScreen AnimatePresence */}
      <motion.div
        key="content"
        variants={pageVariants}
        initial="initial"
        animate="in"
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn(
          "flex flex-col md:flex-row w-full h-full bg-transparent overflow-hidden"
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-10 bg-[#0a0b14]/80 backdrop-blur-md border-r border-white/5">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/* Logo or Brand */}
              <div className="flex items-center gap-2 mb-10 px-2">
                <div className="h-6 w-6 bg-cyber-primary rounded-full flex-shrink-0 animate-pulse shadow-[0_0_10px_#00f0ff]" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: open ? 1 : 0 }}
                  className="text-cyber-primary font-bold tracking-widest whitespace-pre"
                >
                  KUSHAL.AI
                </motion.span>
              </div>

              <div className="flex flex-col gap-4">
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    className="text-gray-300 hover:text-cyber-primary transition-colors"
                    onClick={(e) => scrollToSection(e, link.href)}
                  />
                ))}
              </div>
            </div>

            {/* User Profile */}
            <div>
              <SidebarLink
                link={{
                  label: "Kushal Khanal",
                  href: "#",
                  icon: (
                    <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-tr from-cyber-primary to-cyber-secondary p-[1px]">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-cyber-primary">
                        KK
                      </div>
                    </div>
                  ),
                }}
                className="mt-auto"
              />
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-b from-[#0c0d12] via-[#050508] to-[#0a0b14]">
          {/* Section 1: Hero (3D Scene + Text Flip) */}
          <div id="home" className="w-full min-h-screen">
            <Hero />
          </div>

          {/* Section 2: Resume */}
          <div id="resume" className="w-full min-h-screen border-t border-white/5 bg-transparent">
            <Resume />
          </div>

          {/* Section 3: Projects */}
          <div id="projects" className="w-full min-h-screen border-t border-white/5 bg-transparent">
            <Projects />
          </div>

          {/* Section 4: Contact */}
          <div id="contact" className="w-full min-h-screen border-t border-white/5 bg-transparent">
            <Contact />
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Home;