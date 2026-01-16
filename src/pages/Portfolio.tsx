
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { ExternalLink, Globe, Loader2, RefreshCw, X, Maximize2, Layers, Cpu } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../constants';
import type { PortfolioItem } from '../types';

// --- COMPONENTS ---

const ProjectDetailModal: React.FC<{ item: PortfolioItem; onClose: () => void }> = ({ item, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Disable Body Scroll when Modal is active
  useEffect(() => {
    // Save original style to restore later
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Use Portal to render outside the main layout structure
  // This ensures z-index works relative to the window, covering the Navbar
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-bg-main/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        style={{ touchAction: 'none' }} // Prevent touch scrolling on backdrop
        onTouchMove={(e) => e.preventDefault()} // Force block touch move on backdrop
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-panel border border-border-soft rounded-3xl shadow-2-5d animate-in zoom-in-95 duration-300 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left: Preview (Image/Iframe Fallback) */}
        <div className="w-full md:w-1/2 bg-bg-surface border-b md:border-b-0 md:border-r border-border-soft relative min-h-[300px]">
           <iframe 
              src={item.url}
              title={`Full Preview of ${item.title}`}
              className="w-full h-full absolute inset-0 border-0 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 pointer-events-none"
              style={{ backgroundColor: '#0b1412' }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-bg-panel via-transparent to-transparent" />
           
           <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                 <span className="px-2 py-1 rounded bg-accent-primary/20 text-accent-primary text-[10px] font-bold tracking-widest uppercase border border-accent-primary/20 backdrop-blur-sm">
                   Live System
                 </span>
              </div>
           </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col relative bg-bg-panel">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-bg-elevated text-text-muted hover:text-red-400 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-text-primary mb-2">{item.title}</h2>
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent-primary text-sm hover:underline flex items-center gap-1 font-mono"
            >
              {item.url} <ExternalLink size={12} />
            </a>
          </div>

          <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
            <div>
              <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers size={14} /> Description
              </h3>
              <p className="text-text-secondary leading-relaxed text-base">
                {item.description}
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed text-sm">
                This project represents a complete web solution, engineered for performance and scalability. 
                Clicking the link below will grant you full access to the live deployment.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <Cpu size={14} /> Technologies & Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-bg-elevated border border-border-soft text-text-primary text-xs shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 mt-auto border-t border-border-soft/50 flex flex-col-reverse md:flex-row gap-4">
             <Button 
                variant="secondary" 
                size="lg"
                className="flex-1"
                onClick={onClose}
             >
                Close
             </Button>
             <Button 
                size="lg" 
                className="flex-[2] shadow-glow" 
                onClick={() => window.open(item.url, '_blank')}
             >
                Visit Live Site <ExternalLink size={18} className="ml-2" />
             </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const PortfolioCard: React.FC<{ item: PortfolioItem; onSelect: () => void }> = ({ item, onSelect }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Ref key to force reload if needed
  const [key, setKey] = useState(0); 

  return (
    <Panel 
      hoverEffect={false} // Disable default hover because we have custom hover logic
      className="flex flex-col h-[400px] overflow-hidden group border-border-soft hover:border-accent-primary/50 transition-all duration-300 bg-bg-surface cursor-pointer relative"
      onClick={onSelect}
    >
      {/* 
        Header / Window Bar 
        Gives it a "Mini Browser" feel
      */}
      <div className="h-8 bg-bg-elevated border-b border-border-soft flex items-center px-4 gap-2 z-20 shrink-0">
         <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
         </div>
         <div className="ml-2 px-3 py-0.5 bg-bg-main/50 rounded-full border border-border-soft/30 flex-grow text-[10px] text-text-muted font-mono truncate opacity-60">
            {item.url}
         </div>
      </div>

      {/* 
        Live Preview Container (The Viewport)
      */}
      <div className="relative flex-grow w-full overflow-hidden bg-bg-main group-hover:shadow-inner transition-colors">
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-bg-main text-accent-primary/50 pointer-events-none">
            <Loader2 size={24} className="animate-spin mb-2" />
            <span className="text-xs font-mono tracking-widest">CONNECTING...</span>
          </div>
        )}

        {/* 
            The Scrolling Container 
            1. We scale the content down to 25% (0.25) to fit a desktop view into a card.
            2. We set height to 400% so when scaled down it fills the card.
            3. CRITICAL: We double the height to 800% to allow "scrolling".
            4. On Hover: We translate Y to simulate scrolling down the page.
        */}
        <div 
           className="w-[400%] h-[800%] origin-top-left transform scale-[0.25] transition-transform duration-[3000ms] ease-in-out group-hover:-translate-y-[15%]"
        >
            <iframe 
                key={key}
                src={item.url}
                title={`Preview of ${item.title}`}
                className="w-full h-full border-0"
                style={{ 
                    pointerEvents: 'none', // DISABLE DIRECT INTERACTION
                    backgroundColor: '#0b1412'
                }}
                onLoad={() => setIsLoading(false)}
                tabIndex={-1}
                loading="lazy"
            />
        </div>

        {/* Hover Overlay: "Click for Details" */}
        <div className="absolute inset-0 bg-bg-main/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 pointer-events-none">
             <div className="bg-bg-panel/90 border border-accent-primary/30 text-accent-primary px-4 py-2 rounded-xl shadow-2-5d transform scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center gap-2">
                <Maximize2 size={16} />
                <span className="font-bold text-sm">View Details</span>
             </div>
        </div>
      </div>

      {/* Footer Info (Minimal) */}
      <div className="p-4 bg-bg-panel border-t border-border-soft relative z-20 h-24 shrink-0 flex flex-col justify-center">
        <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors truncate">
            {item.title}
        </h3>
        <p className="text-text-muted text-xs line-clamp-2 leading-relaxed mt-1">
          {item.description}
        </p>
      </div>
    </Panel>
  );
};

const Portfolio: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="space-y-12 py-8 min-h-screen">
       {/* Header */}
       <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold tracking-widest uppercase mb-4">
            <Globe size={12} /> Live Project Archive
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
            Deployed <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-teal-500">Systems</span>
          </h1>
          <p className="text-text-muted text-lg leading-relaxed">
            Hover over a terminal to auto-scroll the interface. Click any card to access full system specifications and live links.
          </p>
       </div>

       {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-0">
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard 
              key={item.id} 
              item={item} 
              onSelect={() => setSelectedItem(item)}
            />
          ))}
       </div>
       
       <div className="text-center pt-12 border-t border-border-soft/30">
          <p className="text-text-muted text-sm">
             System Log: <span className="text-accent-primary">{PORTFOLIO_ITEMS.length} Projects Loaded.</span>
          </p>
       </div>

       {/* Detail Modal */}
       {selectedItem && (
         <ProjectDetailModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
         />
       )}
    </div>
  );
};

export default Portfolio;
