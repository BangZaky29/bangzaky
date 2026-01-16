import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTemplateDetail } from '../hooks/useTemplateDetail';
import { usePurchases } from '../hooks/usePurchases';
import { useBankInfo } from '../hooks/useBankInfo';
import { DEMO_USER_ID } from '../constants';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { CheckCircle, Download, FileCode, Layers, ShieldCheck, ArrowLeft, Loader2, Copy } from 'lucide-react';

const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { template, loading: loadingTemplate, error } = useTemplateDetail(id);
  const { bankInfo, loading: loadingBank } = useBankInfo();
  const { recordPurchase } = usePurchases(DEMO_USER_ID);

  const [showPayment, setShowPayment] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loadingTemplate) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 size={48} className="animate-spin text-accent-primary" />
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Template not found</h2>
        <Button onClick={() => navigate('/market')}>Back to Marketplace</Button>
      </div>
    );
  }

  const handleConfirmPayment = async () => {
    setProcessingPayment(true);
    const success = await recordPurchase(template.id);
    setProcessingPayment(false);
    
    if (success) {
      setPurchaseComplete(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => navigate('/market')} 
          className="p-2 rounded-lg bg-bg-panel border border-border-soft hover:border-accent-primary/50 text-text-muted hover:text-text-primary transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-text-muted text-sm font-medium">Back to Marketplace</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image & Details */}
        <div className="lg:col-span-7 space-y-8">
          <Panel className="p-3 bg-bg-surface border-border-strong shadow-lg">
            <div className="rounded-xl overflow-hidden aspect-video relative group">
              <img src={template.imageUrl} alt={template.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-bg-panel/90 backdrop-blur border border-border-soft px-4 py-2 rounded-lg shadow-lg">
                  <span className="text-accent-primary font-mono text-sm tracking-wide">PREVIEW MODE</span>
                </div>
              </div>
            </div>
          </Panel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Panel className="p-6 h-full">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-primary">
                <FileCode className="text-accent-primary w-5 h-5" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {template.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-bg-main border border-border-soft text-text-secondary text-xs font-mono shadow-inset">
                    {tech}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel className="p-6 h-full">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-primary">
                <Layers className="text-accent-primary w-5 h-5" /> Structure
              </h3>
              <div className="font-mono text-[10px] md:text-xs leading-relaxed text-text-muted bg-bg-main p-4 rounded-xl border border-border-soft shadow-inset overflow-hidden">
                <div className="opacity-75">
                  <span className="text-accent-primary">root</span>/<br/>
                  ├── <span className="text-blue-400">src</span>/<br/>
                  │   ├── <span className="text-green-400">components</span>/<br/>
                  │   ├── <span className="text-green-400">hooks</span>/<br/>
                  │   ├── <span className="text-green-400">pages</span>/<br/>
                  │   └── <span className="text-yellow-400">App.tsx</span><br/>
                  └── <span className="text-yellow-400">package.json</span>
                </div>
              </div>
            </Panel>
          </div>
          
          <div className="prose prose-invert max-w-none">
             <h3 className="text-xl font-bold mb-4">Description</h3>
             <p className="text-text-secondary leading-relaxed">{template.description}</p>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          <div className="sticky top-28 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-text-primary leading-tight">{template.title}</h1>
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 rounded-full bg-accent-muted/20 text-accent-primary border border-accent-muted/30 text-xs font-bold tracking-wider uppercase">
                   {template.category}
                 </span>
                 <span className="w-1 h-1 rounded-full bg-text-muted"></span>
                 <span className="text-text-muted text-sm">{template.type}</span>
              </div>
            </div>

            {!showPayment && !purchaseComplete && (
              <Panel className="p-8 border-accent-muted/20 bg-gradient-to-br from-bg-panel to-bg-elevated/50">
                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-text-muted font-medium">License Price</span>
                  <span className="text-5xl font-bold text-text-primary tracking-tight">${template.price}</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  {template.features.map(feat => (
                    <div key={feat} className="flex items-start gap-3 text-text-secondary text-sm">
                      <CheckCircle size={16} className="text-accent-primary mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-3 text-text-secondary text-sm">
                    <ShieldCheck size={16} className="text-accent-primary mt-0.5 flex-shrink-0" />
                    <span className="font-semibold text-text-primary">Commercial Usage License</span>
                  </div>
                </div>

                <Button className="w-full h-14 text-lg shadow-lg shadow-accent-primary/10" onClick={() => setShowPayment(true)}>
                  Purchase Now
                </Button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted opacity-70">
                   <ShieldCheck size={12} /> Secure encrypted transaction
                </div>
              </Panel>
            )}

            {showPayment && !purchaseComplete && (
              <Panel className="p-8 border-accent-primary/50 relative overflow-hidden ring-1 ring-accent-primary/20">
                 <div className="absolute top-0 left-0 w-full h-1 bg-accent-primary animate-pulse"></div>
                 <h3 className="text-xl font-bold mb-6 text-accent-primary flex items-center gap-2">
                   Payment Gateway <span className="text-xs bg-accent-primary/10 px-2 py-0.5 rounded text-accent-primary border border-accent-primary/20">SECURE</span>
                 </h3>
                 
                 {loadingBank ? (
                   <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-accent-primary" size={32}/></div>
                 ) : bankInfo ? (
                   <div className="space-y-4 mb-8 bg-bg-main p-6 rounded-2xl border border-border-soft shadow-inset">
                     <div className="flex justify-between items-center border-b border-border-soft/50 pb-3">
                       <span className="text-text-muted text-sm">Bank Transfer</span>
                       <span className="font-bold text-text-primary">{bankInfo.bank}</span>
                     </div>
                     <div className="py-2">
                       <span className="text-text-muted text-xs uppercase tracking-wider mb-1 block">Account Number</span>
                       <div className="flex items-center justify-between">
                         <span className="font-mono font-bold text-2xl tracking-widest text-accent-soft">{bankInfo.accountNumber}</span>
                         <button className="text-text-muted hover:text-accent-primary transition-colors"><Copy size={16}/></button>
                       </div>
                     </div>
                     <div className="pt-2 border-t border-border-soft/50">
                       <span className="text-text-muted text-xs uppercase tracking-wider mb-1 block">Beneficiary</span>
                       <span className="font-medium text-text-primary">{bankInfo.accountName}</span>
                     </div>
                   </div>
                 ) : (
                   <div className="text-red-400 mb-4 bg-red-900/10 p-4 rounded-lg text-sm border border-red-900/30">Unable to load bank details.</div>
                 )}

                 <div className="bg-bg-surface/50 p-4 rounded-xl mb-6 text-sm text-text-muted border border-border-soft/30">
                   Please transfer exactly <span className="text-text-primary font-bold">${template.price}</span>. Verification is instant after confirmation.
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <Button variant="secondary" onClick={() => setShowPayment(false)} disabled={processingPayment}>
                     Cancel
                   </Button>
                   <Button onClick={handleConfirmPayment} disabled={processingPayment || !bankInfo}>
                     {processingPayment ? <Loader2 className="animate-spin mx-auto"/> : "I Have Paid"}
                   </Button>
                 </div>
              </Panel>
            )}

            {purchaseComplete && (
              <Panel className="p-8 border-green-500/30 bg-gradient-to-b from-green-900/10 to-transparent text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400 border border-green-500/20 shadow-glow-green">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Payment Verified</h3>
                <p className="text-text-secondary mb-8 text-sm">
                  License key generated successfully. You have full access to the source code.
                </p>
                <div className="space-y-3">
                   <Button onClick={() => navigate('/dashboard')} className="w-full flex items-center justify-center gap-2 h-12">
                      <Download size={18} />
                      Download Source Code
                    </Button>
                   <Button variant="secondary" onClick={() => setPurchaseComplete(false)} className="w-full">
                     Browse More Templates
                   </Button>
                </div>
              </Panel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;