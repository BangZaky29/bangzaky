import React, { useState, useMemo } from 'react';
import { useTemplates } from '../hooks/useTemplates';
import { TemplateCard } from '../components/TemplateCard';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { Search, Filter, Loader2, AlertTriangle, X } from 'lucide-react';

const Marketplace: React.FC = () => {
  const { templates, loading, error } = useTemplates();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const categories = ['All', 'Food', 'Manufacturing', 'Furniture', 'Tech', 'Education', 'Creative'];
  const types = ['All', 'Landing Page', 'Portfolio', 'Business Website'];

  const filteredTemplates = useMemo(() => {
    if (!Array.isArray(templates)) return [];

    return templates.filter(t => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
      const matchesType = selectedType === 'All' || t.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [templates, searchTerm, selectedCategory, selectedType]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedType('All');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-accent-primary space-y-4">
        <Loader2 size={48} className="animate-spin" />
        <p className="font-mono text-sm tracking-widest text-text-muted animate-pulse">ESTABLISHING CONNECTION...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-red-400 text-center px-4">
        <AlertTriangle size={48} className="mb-4 opacity-80" />
        <h2 className="text-xl font-bold mb-2">Signal Lost</h2>
        <p className="text-text-muted mb-6 max-w-md">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry Connection</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-border-soft/50">
        <div>
           <h1 className="text-3xl font-bold text-text-primary mb-2">Marketplace</h1>
           <p className="text-text-muted">Premium templates for your next project.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search database..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-bg-main border border-border-soft rounded-xl pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary shadow-inset transition-all"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="sticky top-28 space-y-6">
            <Panel className="p-6">
              <div className="flex items-center gap-2 mb-6 text-text-primary">
                <Filter size={18} className="text-accent-primary" />
                <h2 className="font-bold text-base">Filter System</h2>
              </div>

              <div className="space-y-8">
                {/* Category Filter */}
                <div>
                  <h3 className="text-xs font-bold text-text-muted mb-3 uppercase tracking-wider pl-2">
                    Industry
                  </h3>
                  <div className="space-y-1">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 border border-transparent ${
                          selectedCategory === cat
                            ? 'bg-bg-elevated text-accent-primary shadow-sm border-border-soft font-medium'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border-soft/50 mx-2" />

                {/* Type Filter */}
                <div>
                  <h3 className="text-xs font-bold text-text-muted mb-3 uppercase tracking-wider pl-2">
                    Type
                  </h3>
                  <div className="space-y-1">
                    {types.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 border border-transparent ${
                          selectedType === type
                            ? 'bg-bg-elevated text-accent-primary shadow-sm border-border-soft font-medium'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
            
            {(selectedCategory !== 'All' || selectedType !== 'All' || searchTerm) && (
              <Button variant="secondary" className="w-full justify-center" onClick={clearFilters}>
                Reset All Filters
              </Button>
            )}
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-grow w-full">
           <div className="mb-4 text-sm text-text-muted">
             Showing {filteredTemplates.length} {filteredTemplates.length === 1 ? 'result' : 'results'}
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map(template => (
                <TemplateCard key={template.id} template={template} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-dashed border-border-soft rounded-3xl bg-bg-surface/30">
                <Search className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
                <p className="text-lg text-text-primary font-medium mb-2">No results found</p>
                <p className="text-text-muted mb-6">Try adjusting your search or filters.</p>
                <Button 
                  variant="secondary" 
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;