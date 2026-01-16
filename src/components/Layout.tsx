
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { BackgroundAnimation } from './ui/BackgroundAnimation';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  // Filter out Contact from the main nav items for desktop view
  const mainNavItems = NAV_ITEMS.filter(item => item.label !== 'Contact');

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-sans selection:bg-accent-primary selection:text-bg-main flex flex-col relative overflow-x-hidden">
      {/* Dynamic Background Animation (Shapes) */}
      <BackgroundAnimation />
      
      {/* Background Noise Texture */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none z-0"></div>
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto bg-bg-panel/90 backdrop-blur-xl rounded-full border border-border-soft shadow-lg px-6 py-3 flex items-center justify-between transition-all duration-300">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-bg-elevated rounded-full flex items-center justify-center border border-border-strong shadow-2-5d group-hover:shadow-glow transition-all duration-300">
              <Terminal className="text-accent-primary w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-text-primary hidden sm:inline-block">Bang<span className="text-accent-primary">Zaky</span></span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 bg-bg-main/50 p-1.5 rounded-full border border-border-soft/50 shadow-inner">
              {mainNavItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path}
                  className={({ isActive }) => 
                    `relative px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                      isActive 
                        ? 'text-accent-primary' 
                        : 'text-text-muted hover:text-text-primary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="nav-bg"
                          className="absolute inset-0 bg-bg-elevated rounded-full shadow-sm border border-border-soft"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
            
            <div className="h-6 w-px bg-border-soft/50" />
            
             <div className="flex items-center gap-3">
               <NavLink to="/contact">
                  <button className={`px-6 py-2 rounded-full border text-sm font-medium transition-all shadow-sm ${location.pathname === '/contact' ? 'bg-bg-elevated border-accent-primary text-accent-primary shadow-glow' : 'border-border-soft text-text-muted hover:text-accent-primary hover:border-accent-primary/50 hover:bg-bg-elevated'}`}>
                    Contact
                  </button>
               </NavLink>
               
               <NavLink 
                 to="/dashboard" 
                 className={({ isActive }) => `relative group p-2 rounded-full transition-all ${isActive ? 'bg-bg-elevated text-accent-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
               >
                 <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
               </NavLink>
             </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-text-muted hover:text-accent-primary hover:bg-bg-elevated rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 absolute left-4 right-4 bg-bg-panel/95 backdrop-blur-xl rounded-3xl border border-border-soft shadow-2-5d p-4 flex flex-col gap-2 animate-in slide-in-from-top-4 fade-in z-50">
            {NAV_ITEMS.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `px-4 py-4 rounded-xl text-center font-medium transition-colors ${
                    isActive 
                      ? 'bg-bg-elevated text-accent-primary shadow-inset border border-border-soft' 
                      : 'text-text-muted hover:bg-bg-surface hover:text-text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="flex-grow px-4 md:px-8 py-8 md:py-12 relative z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-soft bg-bg-surface mt-auto relative z-10 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-bg-elevated rounded-lg flex items-center justify-center border border-border-soft">
                <Terminal className="text-accent-primary w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-text-primary">BangZaky</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Crafting the next generation of web interfaces. Premium, scalable, and modern templates for forward-thinking developers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12 sm:gap-24 text-sm">
            <div className="space-y-4">
              <h4 className="font-semibold text-text-primary tracking-wide">PLATFORM</h4>
              <ul className="space-y-3 text-text-muted">
                <li><NavLink to="/market" className="hover:text-accent-primary transition-colors">Marketplace</NavLink></li>
                <li><NavLink to="/portfolio" className="hover:text-accent-primary transition-colors">Portfolio</NavLink></li>
                <li><NavLink to="/dashboard" className="hover:text-accent-primary transition-colors">Dashboard</NavLink></li>
                <li><a href="#" className="hover:text-accent-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-text-primary tracking-wide">SUPPORT</h4>
              <ul className="space-y-3 text-text-muted">
                <li><NavLink to="/contact" className="hover:text-accent-primary transition-colors">Contact</NavLink></li>
                <li><a href="#" className="hover:text-accent-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-accent-primary transition-colors">License</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-border-soft/50 py-8 text-center text-text-muted/60 text-xs">
          &copy; {new Date().getFullYear()} Zaky Aulia Qolbi. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
