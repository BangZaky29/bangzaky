import React from 'react';
import type { Template } from '../types';
import { Panel } from './ui/Panel';
import { useNavigate } from 'react-router-dom';
import { Layers, ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();

  return (
    <Panel 
      hoverEffect={true} 
      className="flex flex-col h-full group bg-bg-panel border-border-soft/50 hover:border-accent-primary/30 transition-all duration-500 overflow-hidden"
      onClick={() => navigate(`/template/${template.id}`)}
    >
      {/* Image Container - Full width at top */}
      <div className="relative h-56 w-full bg-bg-main border-b border-border-soft shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-panel via-transparent to-transparent z-10 opacity-60" />
        <img 
          src={template.imageUrl} 
          alt={template.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 rounded-lg bg-bg-main/90 backdrop-blur-md border border-border-soft text-[10px] font-bold tracking-wider uppercase text-accent-primary shadow-lg">
            {template.category}
          </span>
        </div>
      </div>

      {/* Content Wrapper with Proper Padding */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-1 pr-2">
            {template.title}
          </h3>
          <span className="text-lg font-semibold text-accent-soft tracking-tight whitespace-nowrap">
            ${template.price}
          </span>
        </div>
        
        <p className="text-text-muted text-sm mb-6 line-clamp-2 leading-relaxed h-10">
          {template.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {template.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] px-2.5 py-1 rounded-md bg-bg-elevated text-text-secondary border border-border-soft/50 font-medium">
              {tech}
            </span>
          ))}
          {template.techStack.length > 3 && (
            <span className="text-[10px] px-2 py-1 rounded-md bg-bg-elevated text-text-muted border border-border-soft/50">
              +{template.techStack.length - 3}
            </span>
          )}
        </div>

        <div className="pt-4 border-t border-border-soft/50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-text-muted/80 text-xs">
             <Layers size={14} className="text-accent-muted" /> 
             <span>{template.style}</span>
          </div>
          <button 
            className="text-sm font-medium text-accent-primary flex items-center gap-1 group/btn hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/template/${template.id}`);
            }}
          >
            Details <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </Panel>
  );
};