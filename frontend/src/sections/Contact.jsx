import React, { useState } from "react";
import Button from "../components/Button";
import { CheckCircle2, Send, Mail } from "lucide-react";

/**
 * Contact — pure frontend form with validation, interactive submission,
 * localStorage backup, and direct mailto actions.
 */
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [lastSubmitted, setLastSubmitted] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Smooth client-side processing
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('astrra_inquiries') || '[]');
        const submission = {
          ...formData,
          id: Date.now(),
          date: new Date().toISOString()
        };
        existing.push(submission);
        localStorage.setItem('astrra_inquiries', JSON.stringify(existing));
      } catch (err) {
        // Safe fallback if localStorage is disabled
      }

      setLastSubmitted({ ...formData });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setSubmitStatus('success');
    }, 600);
  };

  const mailtoHref = formData.name || formData.message
    ? `mailto:hello@astrratech.com?subject=${encodeURIComponent(`Project Inquiry from ${formData.name || 'Client'}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
    : "mailto:hello@astrratech.com";

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal>
            10 / CONTACT
          </p>
          <span className="section-head__count" data-reveal>
            START A CONVERSATION
          </span>
        </header>

        <div className="contact__grid">
          <div>
            <h2 className="contact__heading">
              <span data-line data-reveal>
                <span data-line-inner>Make your</span>
              </span>
              <span data-line data-reveal>
                <span data-line-inner>
                  space <em>digitally.</em>
                </span>
              </span>
            </h2>

            <p className="contact__desc" data-reveal>
              Have a project in mind? Write to us — we read everything and
              reply with intent within 24 hours.
            </p>
          </div>

          <div className="contact__form-container w-full max-w-full lg:max-w-[440px]" data-reveal-stagger>
            {submitStatus === 'success' ? (
              <div className="p-7 sm:p-8 bg-[#0e0e0c] border border-[#c8a96b]/40 rounded-2xl shadow-xl shadow-black/40">
                <div className="w-12 h-12 rounded-xl bg-[#c8a96b]/15 border border-[#c8a96b]/40 flex items-center justify-center text-[#c8a96b] mb-4">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-semibold text-[#f4f3ef] tracking-tight">
                  Message Sent Successfully
                </h3>
                <p className="mt-2 text-sm text-[#b9b8b0] leading-relaxed">
                  Thank you, <strong className="text-[#f4f3ef]">{lastSubmitted?.name}</strong>. Your enquiry has been received. Our team will review your requirements and reach out to <span className="text-[#ddc084]">{lastSubmitted?.email}</span> shortly.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmitStatus(null)}
                    className="px-5 py-2.5 rounded-lg border border-[#c8a96b] text-[#c8a96b] hover:bg-[#c8a96b] hover:text-[#0a0a09] font-mono text-xs tracking-wider uppercase transition-colors font-medium text-center"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={mailtoHref}
                    className="px-5 py-2.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-white/30 font-mono text-xs tracking-wider uppercase transition-colors text-center inline-flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" /> Direct Email ↗
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 sm:p-8 rounded-2xl bg-[#0a0a09]/60 border border-white/10 backdrop-blur-sm">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#96958d] mb-1.5" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your Name or Studio"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a96b] focus:bg-white/[0.06] transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#96958d] mb-1.5" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="your.email@domain.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a96b] focus:bg-white/[0.06] transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#96958d] mb-1.5" htmlFor="contact-message">
                    Project Scope / Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your brand, project timeline, or digital goals..."
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a96b] focus:bg-white/[0.06] transition-all text-sm resize-none"
                  ></textarea>
                </div>
                
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-xs font-mono">Please fill out all fields with valid information.</p>
                )}
                
                <Button type="submit" variant="gold" className="w-full mt-2" disabled={isSubmitting}>
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending Inquiry..." : "Send Message"}
                  </span>
                </Button>
              </form>
            )}
            
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-mono">
              <a className="text-white/60 hover:text-[#c8a96b] transition-colors flex items-center gap-1.5" href="mailto:hello@astrratech.com">
                <Mail className="w-3.5 h-3.5" /> hello@astrratech.com ↗
              </a>
              <a className="text-white/60 hover:text-[#c8a96b] transition-colors" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="ASTRRA TECH on LinkedIn">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
