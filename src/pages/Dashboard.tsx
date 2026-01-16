import React from 'react';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { usePurchases } from '../hooks/usePurchases';
import { DEMO_USER_ID } from '../constants';
import { Download, Package, ExternalLink, Loader2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { purchases, loading } = usePurchases(DEMO_USER_ID);
  const navigate = useNavigate();

  const activeLicenses = purchases.length;
  const totalAssetsSize = (purchases.length * 1.2).toFixed(1); 

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-accent-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border-soft/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Command Center</h1>
          <p className="text-text-muted">Welcome back, Engineer. Here are your active assets.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-900/10 rounded-full border border-green-500/20">
           <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
           <span className="text-xs font-mono font-medium text-green-400">SYSTEM SECURE</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Panel className="p-6 flex items-center gap-5">
          <div className="p-4 bg-bg-elevated rounded-2xl text-accent-primary border border-border-soft shadow-inner">
            <Package size={28} />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-text-primary">{activeLicenses}</h3>
            <p className="text-text-muted text-xs uppercase tracking-wider font-semibold">Active Licenses</p>
          </div>
        </Panel>
         <Panel className="p-6 flex items-center gap-5">
          <div className="p-4 bg-bg-elevated rounded-2xl text-accent-primary border border-border-soft shadow-inner">
            <Download size={28} />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-text-primary">{totalAssetsSize}<span className="text-lg text-text-muted font-normal ml-1">GB</span></h3>
            <p className="text-text-muted text-xs uppercase tracking-wider font-semibold">Total Assets</p>
          </div>
        </Panel>
         <Panel className="p-6 flex items-center gap-5">
          <div className="p-4 bg-bg-elevated rounded-2xl text-accent-primary border border-border-soft shadow-inner">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-text-primary">Pro</h3>
            <p className="text-text-muted text-xs uppercase tracking-wider font-semibold">Support Plan</p>
          </div>
        </Panel>
      </div>

      {/* List Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
          Repository <span className="text-sm font-normal text-text-muted bg-bg-panel px-2 py-0.5 rounded-md border border-border-soft">{purchases.length}</span>
        </h2>

        {purchases.length === 0 ? (
          <Panel className="py-20 text-center border-dashed border-border-soft/50 bg-bg-surface/30">
            <Package className="w-16 h-16 text-text-muted/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Repository Empty</h3>
            <p className="text-text-muted mb-6 max-w-sm mx-auto">You haven't purchased any templates yet. Visit the marketplace to initialize your collection.</p>
            <Button onClick={() => navigate('/market')}>Browse Marketplace</Button>
          </Panel>
        ) : (
          <div className="space-y-4">
            {purchases.map(purchase => {
              const template = purchase.template;
              if (!template) return null; 
              
              return (
                <Panel key={purchase.id} className="p-0 overflow-hidden hover:border-accent-primary/30 transition-colors group">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    
                    {/* Content */}
                    <div className="flex-grow p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           <h3 className="text-lg font-bold text-text-primary">{template.title}</h3>
                           <span className="text-[10px] px-2 py-0.5 rounded bg-bg-elevated border border-border-soft text-text-muted">{template.type}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-text-muted">
                           <p><span className="text-text-secondary/50 mr-2">License ID:</span><span className="font-mono text-xs">{purchase.id}</span></p>
                           <p><span className="text-text-secondary/50 mr-2">Acquired:</span>{new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button variant="secondary" size="sm" onClick={() => navigate(`/template/${template.id}`)} className="flex-1 md:flex-none justify-center">
                           <ExternalLink size={16} className="mr-2" /> Details
                        </Button>
                        <Button size="sm" className="flex-1 md:flex-none justify-center">
                           <Download size={16} className="mr-2" /> Source Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </Panel>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;