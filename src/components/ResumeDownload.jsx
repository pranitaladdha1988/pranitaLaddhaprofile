import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, CheckCircle, Mail } from 'lucide-react';

const ResumeDownload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      // Submit to our new Cloudflare API endpoint
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('API request failed');
      
      setFormState('success');
    } catch (err) {
      console.error(err);
      setFormState('error');
    }
  };

  return (
    <div className="resume-download-wrapper">
      <button className="download-resume-btn" onClick={() => setIsOpen(true)}>
        <Download size={14} /> RESUME
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="download-modal"
            >
              <button className="close-modal" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>

                {formState === 'success' ? (
                  <div className="success-state">
                    <div className="success-icon">
                      <CheckCircle size={48} color="#4ade80" />
                    </div>
                    <h3 className="success-title">Thank you! You can now download the resume</h3>
                    <div className="final-download-action">
                      <a 
                        href="/resume.pdf" 
                        download 
                        className="submit-download-btn primary"
                        onClick={() => {
                          setTimeout(() => {
                            setIsOpen(false);
                            setFormState('idle');
                            setFormData({ name: '', email: '', company: '' });
                          }, 1000);
                        }}
                      >
                        <Download size={18} /> DOWNLOAD PDF
                      </a>
                    </div>
                  </div>
               ) : (
                <>
                  <div className="modal-header">
                    <h3>GET RESUME</h3>
                    <p>Please provide your details to access the PDF.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="download-form">
                    <div className="form-group">
                      <label>NAME *</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="form-group">
                      <label>EMAIL *</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>COMPANY (OPTIONAL)</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Your Company"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="submit-download-btn"
                      disabled={formState === 'submitting'}
                    >
                      {formState === 'submitting' ? 'INITIATING...' : 'DOWNLOAD NOW'}
                    </button>
                    
                    {formState === 'error' && (
                      <p className="error-msg">Something went wrong. Please try again.</p>
                    )}
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeDownload;
