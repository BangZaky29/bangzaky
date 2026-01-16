import React, { useState } from 'react';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Initialize Communication</h1>
        <p className="text-text-muted">Have a project in mind or need support with a template?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Panel className="p-6 text-center space-y-2 hover:shadow-glow transition-all">
            <Mail className="mx-auto text-accent-primary w-8 h-8 mb-2" />
            <h3 className="font-bold text-sm">Email</h3>
            <p className="text-text-muted text-xs break-all">zaky@bangzaky.dev</p>
          </Panel>
          
          <Panel className="p-6 text-center space-y-2 hover:shadow-glow transition-all">
            <MessageSquare className="mx-auto text-accent-primary w-8 h-8 mb-2" />
            <h3 className="font-bold text-sm">Support</h3>
            <p className="text-text-muted text-xs">24/7 Template Support</p>
          </Panel>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          {sent ? (
             <Panel className="p-12 text-center h-full flex flex-col items-center justify-center">
               <div className="w-16 h-16 bg-accent-primary/20 rounded-full flex items-center justify-center mb-4 text-accent-primary">
                 <Send size={32} />
               </div>
               <h3 className="text-2xl font-bold text-text-primary mb-2">Message Transmitted</h3>
               <p className="text-text-muted">We will respond within 24 hours.</p>
               <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>Send Another</Button>
             </Panel>
          ) : (
            <Panel className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Identity Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-bg-main border border-border-soft rounded-xl p-3 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all shadow-inset"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Digital Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-bg-main border border-border-soft rounded-xl p-3 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all shadow-inset"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Transmission Content</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-bg-main border border-border-soft rounded-xl p-3 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all shadow-inset resize-none"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Transmit Message <Send size={16} className="ml-2" />
                </Button>
              </form>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;