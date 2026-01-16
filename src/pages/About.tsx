import React from 'react';
import { Panel } from '../components/ui/Panel';
import { Terminal, Cpu, Globe, User } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      {/* Profile Header */}
      <div className="text-center space-y-4">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-bg-elevated to-bg-panel rounded-full p-1 border-2 border-accent-primary shadow-glow">
           <div className="w-full h-full bg-bg-main rounded-full flex items-center justify-center overflow-hidden">
             <User size={64} className="text-text-muted" />
           </div>
        </div>
        <h1 className="text-4xl font-bold">Zaky Aulia Qolbi</h1>
        <p className="text-accent-primary font-mono">IT Engineer & Web Developer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Panel className="p-8 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Terminal className="text-accent-primary" /> Philosophy
          </h2>
          <p className="text-text-muted leading-relaxed">
            I believe that code is modern art. My mission is to build reusable, scalable, and elegant UI systems that bridge the gap between complex functionality and beautiful aesthetics. 
          </p>
          <p className="text-text-muted leading-relaxed">
            BangZaky represents a departure from flat, lifeless design, embracing a 2.5D tactile future where digital interfaces feel real.
          </p>
        </Panel>

        <Panel className="p-8 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Cpu className="text-accent-primary" /> Expertise
          </h2>
          <ul className="space-y-3">
             {[
               "Advanced React & TypeScript Patterns",
               "UI/UX Systems & Design Tokens",
               "Frontend Performance Optimization",
               "Fullstack Integration (Node/Next.js)",
               "3D Web Interactions (Three.js/R3F)"
             ].map((skill, i) => (
               <li key={i} className="flex items-center gap-3 text-text-secondary bg-bg-elevated p-2 rounded-lg border border-border-soft text-sm">
                 <div className="w-1.5 h-1.5 bg-accent-primary rounded-full" />
                 {skill}
               </li>
             ))}
          </ul>
        </Panel>
      </div>

      <Panel className="p-12 text-center bg-bg-surface border-none shadow-inset">
        <Globe className="w-12 h-12 text-text-muted mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Working Globally</h3>
        <p className="text-text-muted max-w-xl mx-auto">
          Based in the cloud, serving clients and developers worldwide. BangZaky templates are currently powering over 500+ websites across 20 countries.
        </p>
      </Panel>
    </div>
  );
};

export default About;