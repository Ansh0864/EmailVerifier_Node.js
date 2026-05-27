import { useState } from "react";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, submitting, success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            Have questions about our API, pricing, or need technical support? 
            Our engineering team is here to help you integrate seamlessly.
          </p>
          
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={styles.icon}>📧</span>
              <div>
                <h4>Support</h4>
                <p>support@validatorpro.com</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.icon}>🏢</span>
              <div>
                <h4>Enterprise Sales</h4>
                <p>sales@validatorpro.com</p>
              </div>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="John Doe"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">Work Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="john@company.com"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="message">How can we help?</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows="5" 
              placeholder="Tell us about your project..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn} 
            disabled={status === "submitting" || status === "success"}
          >
            {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent! ✓" : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}