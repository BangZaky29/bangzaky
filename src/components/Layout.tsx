import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag, Terminal } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-sans selection:bg-accent-primary selection:text-bg-main flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-4 z-50 px-4 md:px-8 mb-8">
        <div className="max-w-7xl mx-auto bg-bg-panel/90 backdrop-blur-md rounded-2xl border border-border-soft shadow-lg px-6 py-4 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center border border-border-strong shadow-2-5d group-hover:shadow-glow transition-all">
              <Terminal className="text-accent-primary w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-wide text-text-primary">Bang<span className="text-accent-primary">Zaky</span></span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path}
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-accent-primary ${isActive ? 'text-accent-primary drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]' : 'text-text-muted'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="h-6 w-px bg-border-soft mx-2" />
             <NavLink to="/dashboard" className="relative group">
               <ShoppingBag className="w-6 h-6 text-text-muted group-hover:text-accent-primary transition-colors" />
             </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-text-muted hover:text-accent-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 absolute left-4 right-4 bg-bg-panel rounded-2xl border border-border-soft shadow-2-5d p-4 flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in">
            {NAV_ITEMS.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-bg-elevated text-accent-primary shadow-inset' : 'text-text-muted hover:bg-bg-surface'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="flex-grow px-4 md:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-soft mt-12 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg text-text-primary mb-2">BangZaky</h4>
            <p className="text-text-muted text-sm max-w-xs">
              Premium, scalable, and modern web templates for the next generation of the web.
            </p>
          </div>
          <div className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} Zaky Aulia Qolbi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;