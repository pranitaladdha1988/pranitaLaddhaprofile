import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, CheckCircle } from 'lucide-react';

const ResumeDownload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Determine API URL based on environment (handled by proxy in dev/netlify)
    const API_BASE = ''; 
    
    try {
      // 1. Capture Lead
      const response = await fetch(`${API_BASE}/api/resume/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Failed to capture lead');
      const { token } = await response.json();
      
      // 2. Trigger Download
      window.location.href = `${API_BASE}/api/resume/download/${token}`;
      
      setFormState('success');
      setTimeout(() => {
        setIsOpen(false);
        setFormState('idle');
        setFormData({ name: '', email: '', company: '' });
      }, 2000);
      
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
                  <CheckCircle size={48} color="#4ade80" />
                  <h3>THANK YOU</h3>
                  <p>Your download should start automatically.</p>
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
