import React, { useState } from "react";
import Button from "../components/Button";

/**
 * Contact — now with a fully functional form submitting to the backend API.
 */
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal>
            09 / CONTACT
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
              reply with intent.
            </p>
          </div>

          <div className="contact__form-container" data-reveal-stagger style={{width: "100%", maxWidth: "400px"}}>
            {submitStatus === 'success' ? (
              <div className="p-6 bg-[#c8a96b]/10 border border-[#c8a96b] text-[#c8a96b] rounded-lg">
                <p>Thank you for reaching out! We have received your message.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 bg-transparent border-b border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#c8a96b]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 bg-transparent border-b border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#c8a96b]"
                />
                <textarea
                  name="message"
                  placeholder="How can we help?"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="p-3 bg-transparent border-b border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#c8a96b] resize-none"
                ></textarea>
                
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>
                )}
                
                <Button type="submit" variant="gold" className="mt-4" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
            
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-3">
              <a className="text-white/60 hover:text-[#c8a96b] transition-colors" href="mailto:hello@astrratech.com">hello@astrratech.com ↗</a>
              <a className="text-white/60 hover:text-[#c8a96b] transition-colors" href="#" aria-label="ASTRRA TECH on LinkedIn">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
