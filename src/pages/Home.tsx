import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { Code, Monitor, Cpu, Zap, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="inline-block px-4 py-1.5 rounded-full border border-border-strong bg-bg-elevated shadow-glow mb-4">
          <span className="text-xs font-mono text-accent-primary tracking-widest uppercase">System Online // v2.0.4</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="block text-text-primary mb-2">Architecting the</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-muted">
            Future Web
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-text-muted leading-relaxed">
          BangZaky provides premium, industry-ready web templates built with a 
          scientific approach to design and code. Elevate your digital presence 
          with our modular 2.5D systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button size="lg" onClick={() => navigate('/market')}>
            Browse Templates <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/about')}>
            View Portfolio
          </Button>
        </div>
      </section>

      {/* Value Props Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Panel className="p-6 space-y-4">
          <div className="w-12 h-12 bg-bg-elevated rounded-xl flex items-center justify-center text-accent-primary shadow-inset">
            <Code className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Clean Code</h3>
          <p className="text-text-muted text-sm">
            TypeScript strictly typed, modular component architecture, and clean abstractions.
          </p>
        </Panel>

        <Panel className="p-6 space-y-4">
          <div className="w-12 h-12 bg-bg-elevated rounded-xl flex items-center justify-center text-accent-primary shadow-inset">
            <Monitor className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Modern UI</h3>
          <p className="text-text-muted text-sm">
            2.5D Soft-skeuomorphic aesthetic that stands out from flat design trends.
          </p>
        </Panel>

        <Panel className="p-6 space-y-4">
          <div className="w-12 h-12 bg-bg-elevated rounded-xl flex items-center justify-center text-accent-primary shadow-inset">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Industry Ready</h3>
          <p className="text-text-muted text-sm">
            Pre-configured for production with SEO, analytics, and performance optimization.
          </p>
        </Panel>

        <Panel className="p-6 space-y-4">
          <div className="w-12 h-12 bg-bg-elevated rounded-xl flex items-center justify-center text-accent-primary shadow-inset">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">High Performance</h3>
          <p className="text-text-muted text-sm">
            Built on Vite for instant HMR and optimized production builds.
          </p>
        </Panel>
      </section>

      {/* Featured CTA */}
      <Panel className="p-12 text-center bg-gradient-to-b from-bg-panel to-bg-elevated border-accent-muted/20">
        <h2 className="text-3xl font-bold mb-4">Ready to upgrade your stack?</h2>
        <p className="text-text-muted mb-8 max-w-xl mx-auto">
          Join hundreds of developers and businesses using BangZaky templates to launch faster.
        </p>
        <Button onClick={() => navigate('/market')}>
          Access the Database
        </Button>
      </Panel>
    </div>
  );
};

export default Home;