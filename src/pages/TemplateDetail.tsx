
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTemplateDetail } from '../hooks/useTemplateDetail';
import { usePurchases } from '../hooks/usePurchases';
import { useBankInfo } from '../hooks/useBankInfo';
import { DEMO_USER_ID } from '../constants';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { CheckCircle, Download, FileCode, Layers, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';

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
      <div className="flex h-[50vh] items-center justify-center">
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
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <Button variant="secondary" size="sm" onClick={() => navigate('/market')} className="mb-4">
        <ArrowLeft size={16} className="mr-2" /> Back to Market
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Image & Tech */}
        <div className="space-y-8">
          <Panel className="p-2 bg-bg-surface border-border-strong">
            <div className="rounded-xl overflow-hidden aspect-video relative">
              <img src={template.imageUrl} alt={template.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 to-transparent flex items-end p-6">
                <div className="bg-bg-panel/90 backdrop-blur border border-border-soft px-4 py-2 rounded-lg shadow-lg">
                  <span className="text-accent-primary font-mono text-sm">Preview Mode</span>
                </div>
              </div>
            </div>
          </Panel>

          <Panel className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FileCode className="text-accent-primary" /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {template.techStack.map(tech => (
                <span key={tech} className="px-3 py-2 rounded-lg bg-bg-elevated border border-border-soft text-text-secondary text-sm shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Layers className="text-accent-primary" /> Folder Structure
            </h3>
            <div className="font-mono text-xs text-text-muted bg-bg-main p-4 rounded-xl border border-border-soft shadow-inner overflow-x-auto">
              <div className="pl-2 border-l border-border-soft">
                src/<br/>
                ├── assets/<br/>
                ├── components/<br/>
                │   ├── ui/<br/>
                │   └── layout/<br/>
                ├── hooks/<br/>
                ├── pages/<br/>
                ├── types/<br/>
                ├── App.tsx<br/>
                └── main.tsx
              </div>
            </div>
          </Panel>
        </div>

        {/* Right Column: Info & Purchase */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">{template.title}</h1>
            <div className="flex items-center gap-4 text-text-muted mb-6">
              <span className="px-3 py-1 rounded-full bg-bg-elevated text-sm border border-border-soft">{template.category}</span>
              <span className="px-3 py-1 rounded-full bg-bg-elevated text-sm border border-border-soft">{template.type}</span>
            </div>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              {template.description}
            </p>
          </div>

          {!showPayment && !purchaseComplete && (
            <Panel className="p-8 border-accent-muted/30">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-sm text-text-muted block">One-time License</span>
                  <span className="text-4xl font-bold text-accent-primary">${template.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-900/50">Available Now</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {template.features.map(feat => (
                  <li key={feat} className="flex items-start gap-3 text-text-secondary">
                    <CheckCircle size={18} className="text-accent-primary mt-1 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3 text-text-secondary">
                  <ShieldCheck size={18} className="text-accent-primary mt-1 flex-shrink-0" />
                  <span>Commercial Usage License</span>
                </li>
              </ul>

              <Button className="w-full text-lg" onClick={() => setShowPayment(true)}>
                Purchase License
              </Button>
              <p className="text-center text-xs text-text-muted mt-4">
                Secure transaction. Source code available immediately after payment.
              </p>
            </Panel>
          )}

          {showPayment && !purchaseComplete && (
            <Panel className="p-8 border-accent-primary/50 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-accent-primary animate-pulse"></div>
               <h3 className="text-xl font-bold mb-6 text-accent-primary">Payment Details</h3>
               
               {loadingBank ? (
                 <div className="py-8 flex justify-center"><Loader2 className="animate-spin"/></div>
               ) : bankInfo ? (
                 <div className="space-y-4 mb-8 bg-bg-main p-6 rounded-xl border border-border-soft shadow-inner">
                   <div className="flex justify-between border-b border-border-soft pb-2">
                     <span className="text-text-muted">Bank</span>
                     <span className="font-mono font-bold">{bankInfo.bank}</span>
                   </div>
                   <div className="flex justify-between border-b border-border-soft pb-2">
                     <span className="text-text-muted">Account Number</span>
                     <span className="font-mono font-bold tracking-wider text-xl">{bankInfo.accountNumber}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-text-muted">Account Name</span>
                     <span className="font-mono font-bold">{bankInfo.accountName}</span>
                   </div>
                   <div className="flex justify-between pt-4 text-accent-soft">
                     <span>Amount to Transfer</span>
                     <span className="font-bold">${template.price} USD</span>
                   </div>
                 </div>
               ) : (
                 <div className="text-red-400 mb-4">Unable to load bank details.</div>
               )}

               <p className="text-sm text-text-muted mb-6">
                 Please transfer the exact amount. Once completed, click the button below to verify and unlock your download.
               </p>

               <div className="flex gap-4">
                 <Button className="flex-1" onClick={handleConfirmPayment} disabled={processingPayment || !bankInfo}>
                   {processingPayment ? <Loader2 className="animate-spin mx-auto"/> : "I Have Transferred"}
                 </Button>
                 <Button variant="secondary" onClick={() => setShowPayment(false)} disabled={processingPayment}>
                   Cancel
                 </Button>
               </div>
            </Panel>
          )}

          {purchaseComplete && (
            <Panel className="p-8 border-green-500/30 bg-green-900/5 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Payment Successful!</h3>
              <p className="text-text-secondary mb-8">
                Thank you for your purchase. You now have full access to the source code.
              </p>
              <div className="flex flex-col gap-4">
                 <Button onClick={() => navigate('/dashboard')} className="flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Source Code
                  </Button>
                 <Button variant="secondary" onClick={() => setPurchaseComplete(false)}>
                   Buy Another Template
                 </Button>
              </div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
