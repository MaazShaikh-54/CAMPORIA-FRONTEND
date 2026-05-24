import './contactus.css';
import { useState } from 'react';
import { Mail, User, MessageSquare, Send } from 'lucide-react';

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-wrapper">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p className="contact-subtitle">We&apos;d love to hear from you. Send us a message!</p>
        </div>

        <div className="pdata">
          <div className="label-input">
            <label className="label" htmlFor="name">
              <User size={16} /> Name
            </label>
            <input type="text" id="name" name="name" placeholder="Your full name" required />
          </div>
          <div className="label-input">
            <label className="label" htmlFor="email">
              <Mail size={16} /> Email
            </label>
            <input type="email" id="email" name="email" placeholder="example@gmail.com" required />
          </div>
        </div>

        <div className="label-input full-width">
          <label className="label" htmlFor="message">
            <MessageSquare size={16} /> Message
          </label>
          <textarea id="message" name="message" placeholder="Write your message here..." rows="5" required></textarea>
        </div>

        <button className="submit" type="submit">
          <Send size={16} />
          {submitted ? "Sent!" : "Send Message"}
        </button>

        {submitted && <p className="success-msg">Thank you! We&apos;ll get back to you soon.</p>}
      </form>
    </div>
  );
};

export default ContactUs;