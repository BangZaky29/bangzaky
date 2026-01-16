
import React from 'react';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { usePurchases } from '../hooks/usePurchases';
import { DEMO_USER_ID } from '../constants';
import { Download, Package, Clock, ExternalLink, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { purchases, loading } = usePurchases(DEMO_USER_ID);
  const navigate = useNavigate();

  // Calculate stats from purchases
  const activeLicenses = purchases.length;
  // Mock data for display purposes
  const totalAssetsSize = (purchases.length * 1.2).toFixed(1); 

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-accent-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Command Center</h1>
          <p className="text-text-muted">Manage your licenses and downloads.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-bg-panel rounded-xl border border-border-soft">
           <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
           <span className="text-sm font-mono text-text-secondary">Network Secure</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Panel className="p-6 flex items-center gap-4">
          <div className="p-3 bg-bg-elevated rounded-xl text-accent-primary">
            <Package size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{activeLicenses}</h3>
            <p className="text-text-muted text-sm">Active Licenses</p>
          </div>
        </Panel>
         <Panel className="p-6 flex items-center gap-4">
          <div className="p-3 bg-bg-elevated rounded-xl text-accent-primary">
            <Download size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{totalAssetsSize}GB</h3>
            <p className="text-text-muted text-sm">Total Assets</p>
          </div>
        </Panel>
         <Panel className="p-6 flex items-center gap-4">
          <div className="p-3 bg-bg-elevated rounded-xl text-accent-primary">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Standard</h3>
            <p className="text-text-muted text-sm">Support Plan</p>
          </div>
        </Panel>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Purchased Assets</h2>

      {purchases.length === 0 ? (
        <Panel className="p-12 text-center border-dashed border-border-strong">
          <Package className="w-16 h-16 text-border-strong mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">No licenses found</h3>
          <p className="text-text-muted mb-6">You haven't purchased any templates yet.</p>
          <Button onClick={() => navigate('/market')}>Browse Marketplace</Button>
        </Panel>
      ) : (
        <div className="space-y-4">
          {purchases.map(purchase => {
            const template = purchase.template;
            if (!template) return null; // Should not happen if API joins correctly
            
            return (
              <Panel key={purchase.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                  <img src={template.imageUrl} alt={template.title} className="w-24 h-16 object-cover rounded-lg border border-border-soft" />
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">{template.title}</h3>
                    <p className="text-sm text-text-muted">License ID: {purchase.id.substring(0, 8).toUpperCase()}</p>
                    <p className="text-xs text-text-muted/70">Purchased: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Button variant="secondary" size="sm" onClick={() => navigate(`/template/${template.id}`)}>
                     <ExternalLink size={16} className="mr-2" /> Details
                  </Button>
                  <Button size="sm" className="flex-1 md:flex-none">
                     <Download size={16} className="mr-2" /> Download Source
                  </Button>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
