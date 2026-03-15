import { useRef, useEffect, useState } from 'react';
import Lanyard from './Lanyard';
import './ContactForm.css';

const ContactForm = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="contact" className={`contact-section-inette ${isVisible ? 'visible' : ''}`}>
            <div className="contact-container-inette">
                {/* Big "Say Hello" CTA — Inette-style */}
                <div className="contact-hero-inette">
                    <p className="contact-ready">Ready to connect?</p>
                    <h2 className="contact-headline-inette">
                        Say Hello.
                    </h2>
                    <div className="contact-deco-circles">
                        <div className="contact-circle c1"></div>
                        <div className="contact-circle c2"></div>
                    </div>
                </div>

                {/* Image + Form Section */}
                <div className="contact-main-grid">
                    <div className="contact-image-wrapper">
                        <Lanyard position={[0, 0, 40]} gravity={[0, -40, 0]} />
                        <div className="contact-wave-icon">👋</div>
                    </div>
                    
                    <div className="contact-form-wrapper">
                        <h3 className="contact-form-title">LET'S WORK TOGETHER</h3>
                        <p className="contact-form-subtitle">Let's build something impactful together—whether it's your brand, your website, or your next big idea.</p>
                        
                        <form className="contact-form-main">
                            <div className="form-row-main">
                                <div className="form-group-main">
                                    <label>Name</label>
                                    <input type="text" placeholder="John Smith" />
                                </div>
                                <div className="form-group-main">
                                    <label>Email</label>
                                    <input type="email" placeholder="johnsmith@gmail.com" />
                                </div>
                            </div>
                            
                            <div className="form-group-main">
                                <label>Service Needed?</label>
                                <select>
                                    <option>Select...</option>
                                    <option>Web Development</option>
                                    <option>UI/UX Design</option>
                                    <option>Brand Identity</option>
                                    <option>AI & Automation</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            
                            <div className="form-group-main">
                                <label>What Can I Help You...</label>
                                <textarea rows="5" placeholder="Hello, I'd like to enquire about..."></textarea>
                            </div>
                            
                            <button type="submit" className="contact-submit-btn">SUBMIT</button>
                        </form>
                    </div>
                </div>

                {/* Contact info footer */}
                <div className="contact-form-grid">
                    <div className="contact-info-side">
                        <div className="contact-info-group">
                            <span className="contact-info-label">EMAIL</span>
                            <a href="mailto:riyanshdiwan@gmail.com" className="contact-info-value">riyanshdiwan@gmail.com</a>
                        </div>
                        <div className="contact-info-group">
                            <span className="contact-info-label">SOCIAL</span>
                            <div className="contact-socials-list">
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="contact-social-link">instagram</a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-social-link">linkedin</a>
                                <a href="https://www.behance.net" target="_blank" rel="noopener noreferrer" className="contact-social-link">behance</a>
                            </div>
                        </div>
                        <div className="contact-info-group">
                            <span className="contact-info-label">BASED IN</span>
                            <span className="contact-info-value">India</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
