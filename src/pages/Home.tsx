import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { Code, Monitor, Cpu, Zap, ArrowRight, Star } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 py-12 md:py-20">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto px-4">
        {/* Background glow effects handled by layout, adding specific hero glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative animate-in slide-in-from-bottom-8 fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-soft bg-bg-panel/50 backdrop-blur-sm shadow-sm mb-8 hover:border-accent-primary/50 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
            <span className="text-xs font-mono text-accent-primary tracking-widest uppercase">System Online v2.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6">
            <span className="block text-text-primary">Architecting</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-accent-soft to-teal-600">
              The Future Web
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary leading-relaxed mb-10">
            BangZaky provides premium, industry-ready web templates built with a 
            scientific approach. Elevate your digital presence with our modular 2.5D systems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="min-w-[180px]" onClick={() => navigate('/market')}>
              Browse Database <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="secondary" className="min-w-[180px]" onClick={() => navigate('/about')}>
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {[
          { label: "Active Users", value: "2k+" },
          { label: "Premium Templates", value: "50+" },
          { label: "Code Quality", value: "A++" },
          { label: "Support", value: "24/7" }
        ].map((stat, i) => (
          <div key={i} className="text-center p-4 rounded-2xl bg-bg-surface/50 border border-border-soft/30 hover:bg-bg-elevated transition-colors">
            <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1">{stat.value}</div>
            <div className="text-xs text-text-muted uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Value Props Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Code, title: "Clean Architecture", desc: "TypeScript strict typing and modular components." },
          { icon: Monitor, title: "2.5D Interface", desc: "Soft-skeuomorphic aesthetic that stands out." },
          { icon: Cpu, title: "Industry Ready", desc: "Pre-configured for production and SEO." },
          { icon: Zap, title: "High Performance", desc: "Built on Vite for instant HMR and speed." }
        ].map((item, idx) => (
          <Panel key={idx} className="p-8 space-y-5 hover:bg-bg-elevated transition-colors duration-300">
            <div className="w-14 h-14 bg-bg-main rounded-2xl flex items-center justify-center text-accent-primary shadow-inset border border-border-soft">
              <item.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">{item.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {item.desc}
            </p>
          </Panel>
        ))}
      </section>

      {/* Featured CTA */}
      <Panel className="p-12 md:p-20 text-center bg-gradient-to-b from-bg-panel to-bg-elevated border-accent-muted/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <Star className="w-12 h-12 text-accent-primary mx-auto mb-4 fill-accent-primary/20" />
          <h2 className="text-3xl md:text-4xl font-bold">Ready to upgrade your stack?</h2>
          <p className="text-text-muted text-lg">
            Join hundreds of developers and businesses using BangZaky templates to launch faster and look better.
          </p>
          <Button size="lg" onClick={() => navigate('/market')}>
            Access the Database
          </Button>
        </div>
      </Panel>
    </div>
  );
};

export default Home;