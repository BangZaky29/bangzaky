
import React from 'react';
import type { Template } from '../api/templates/templates.types';
import { Panel } from './ui/Panel';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';
import { Layers, Code2 } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();

  return (
    <Panel 
      hoverEffect={true} 
      className="flex flex-col h-full group"
      onClick={() => navigate(`/template/${template.id}`)}
    >
      <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 bg-bg-main border border-border-soft shadow-inner">
        <img 
          src={template.imageUrl} 
          alt={template.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
        />
        <div className="absolute top-2 right-2 bg-bg-panel/90 backdrop-blur border border-border-soft px-3 py-1 rounded-lg text-xs font-mono text-accent-primary">
          {template.category}
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">{template.title}</h3>
          <span className="text-lg font-semibold text-accent-soft">${template.price}</span>
        </div>
        
        <p className="text-text-muted text-sm mb-4 line-clamp-2">
          {template.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {template.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 rounded-md bg-bg-elevated text-text-secondary border border-border-soft">
              {tech}
            </span>
          ))}
          {template.techStack.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-md bg-bg-elevated text-text-muted border border-border-soft">
              +{template.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-border-soft flex justify-between items-center">
        <div className="flex items-center gap-4 text-text-muted text-sm">
           <div className="flex items-center gap-1"><Layers size={14} /> <span>{template.style}</span></div>
           <div className="flex items-center gap-1"><Code2 size={14} /> <span>v1.0</span></div>
        </div>
        <Button size="sm" variant="secondary" onClick={(e) => {
          e.stopPropagation();
          navigate(`/template/${template.id}`);
        }}>
          View Details
        </Button>
      </div>
    </Panel>
  );
};
