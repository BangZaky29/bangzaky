import React, { useState, useMemo } from 'react';
import { useTemplates } from '../hooks/useTemplates';
import { TemplateCard } from '../components/TemplateCard';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { Search, Filter, Loader2, AlertTriangle } from 'lucide-react';

const Marketplace: React.FC = () => {
  // 🔥 Panggil hook
  const { templates, loading, error } = useTemplates();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const categories = ['All', 'Food', 'Manufacturing', 'Furniture', 'Tech', 'Education', 'Creative'];
  const types = ['All', 'Landing Page', 'Portfolio', 'Business Website'];

  // 🔒 Safe filter, selalu cek array
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

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-accent-primary">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-mono text-sm tracking-widest">LOADING DATABASE...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-red-400">
        <AlertTriangle size={48} className="mb-4" />
        <h2 className="text-xl font-bold mb-2">Connection Error</h2>
        <p className="text-text-muted mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry Connection</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
        <Panel className="p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-accent-primary">
            <Filter size={20} />
            <h2 className="font-bold text-lg">Filters</h2>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
                Industry
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedCategory === cat
                        ? 'bg-bg-elevated text-accent-primary border-l-2 border-accent-primary pl-4'
                        : 'text-text-muted hover:text-text-primary hover:bg-bg-surface'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-border-soft" />

            {/* Type Filter */}
            <div>
              <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
                Type
              </h3>
              <div className="space-y-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedType === type
                        ? 'bg-bg-elevated text-accent-primary border-l-2 border-accent-primary pl-4'
                        : 'text-text-muted hover:text-text-primary hover:bg-bg-surface'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </aside>

      {/* Main Content */}
      <div className="flex-grow space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input
            type="text"
            placeholder="Search templates, features, tech stack..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-bg-panel border border-border-soft rounded-2xl py-4 pl-12 pr-4 text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary shadow-inset transition-all"
          />
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-text-muted">
              <p>No templates found matching your criteria.</p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedType('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
