import React, { useState } from 'react';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';
import { Mail, MessageSquare, Send, CheckCircle, Linkedin, Github, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = "6281995770190"; // Replaced 0 with 62 for international format
    const text = `- Nama : ${formData.name}
- Email : ${formData.email}
- Pesan : 
"${formData.message}"`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    window.open(whatsappUrl, '_blank');
    setSent(true);
  };

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/BangZaky29", label: "GitHub Main" },
    { icon: Github, href: "https://github.com/BangZaky0029", label: "GitHub Alt" },
    { icon: Instagram, href: "https://www.instagram.com/zaky_aulia_qolbi29/", label: "Instagram" },
    { icon: Facebook, href: "https://web.facebook.com/qolbi.qolbi.1257", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/BangZaky0029", label: "Twitter" },
    { icon: Mail, href: "mailto:bangzaky0029@gmail.com", label: "Email" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Initialize Transmission</h1>
        <p className="text-text-muted max-w-xl mx-auto text-lg">Have a project in mind or need support with a template? Establish a secure connection below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <Panel className="p-6 text-center space-y-3 hover:bg-bg-elevated transition-colors cursor-default group">
            <div className="w-12 h-12 bg-bg-main rounded-xl flex items-center justify-center mx-auto text-accent-primary shadow-inset border border-border-soft group-hover:border-accent-primary/50 transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-text-primary">Email Link</h3>
            <a href="mailto:bangzaky0029@gmail.com" className="block text-text-muted text-sm break-all font-mono bg-bg-surface/50 p-2 rounded border border-border-soft/50 hover:text-accent-primary hover:border-accent-primary/30 transition-colors">
              bangzaky0029@gmail.com
            </a>
          </Panel>
          
          <Panel className="p-6 text-center space-y-3 hover:bg-bg-elevated transition-colors cursor-default group">
             <div className="w-12 h-12 bg-bg-main rounded-xl flex items-center justify-center mx-auto text-accent-primary shadow-inset border border-border-soft group-hover:border-accent-primary/50 transition-colors">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-text-primary">Support</h3>
            <p className="text-text-muted text-sm">Priority assistance for template owners.</p>
          </Panel>

          <Panel className="p-6 space-y-4 bg-bg-surface/30">
            <h3 className="font-bold text-text-primary text-center text-xs uppercase tracking-wider flex items-center justify-center gap-2">
              <span className="w-1 h-1 bg-accent-primary rounded-full animate-pulse"></span>
              Social Uplink
              <span className="w-1 h-1 bg-accent-primary rounded-full animate-pulse"></span>
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {socialLinks.map((link, i) => (
                <a 
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-bg-elevated rounded-xl flex items-center justify-center text-text-muted hover:text-accent-primary hover:bg-bg-panel hover:shadow-glow hover:-translate-y-1 border border-border-soft hover:border-accent-primary/50 transition-all duration-300"
                  aria-label={link.label}
                  title={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </Panel>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          {sent ? (
             <Panel className="p-12 text-center h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95">
               <div className="w-20 h-20 bg-accent-primary/10 rounded-full flex items-center justify-center mb-6 text-accent-primary border border-accent-primary/20 shadow-glow">
                 <CheckCircle size={40} />
               </div>
               <h3 className="text-2xl font-bold text-text-primary mb-2">Transmission Successful</h3>
               <p className="text-text-muted mb-8">Redirecting to encrypted channel (WhatsApp)...</p>
               <Button variant="secondary" onClick={() => setSent(false)}>Initialize New Transmission</Button>
             </Panel>
          ) : (
            <Panel className="p-8 md:p-10 h-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Identity Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-bg-main border border-border-soft rounded-xl p-4 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all shadow-inset placeholder:text-text-muted/30"
                      placeholder="Enter designation"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Digital Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-bg-main border border-border-soft rounded-xl p-4 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all shadow-inset placeholder:text-text-muted/30"
                      placeholder="name@protocol.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Transmission Content</label>
                  <textarea 
                    rows={6}
                    required
                    className="w-full bg-bg-main border border-border-soft rounded-xl p-4 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all shadow-inset resize-none placeholder:text-text-muted/30"
                    placeholder="Input message data..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full md:w-auto min-w-[200px] h-12 shadow-lg shadow-accent-primary/10">
                    Transmit Message <Send size={16} className="ml-2" />
                  </Button>
                </div>
              </form>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;