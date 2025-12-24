import { useRef, useEffect, useState } from 'react';
import profileImg from '../assets/memoji.png';
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
        <section ref={sectionRef} className={`contact-form-section ${isVisible ? 'visible' : ''}`}>
            <div className="contact-form-container">
                <div className="contact-image-wrapper">
                    <img src={profileImg} alt="Riyansh Diwan" className="contact-image" />
                    <div className="wave-icon">👋</div>
                </div>
                
                <div className="contact-form-wrapper">
                    <h2 className="contact-form-title">LET'S WORK TOGETHER</h2>
                    <p className="contact-form-subtitle">Let's build something impactful together—whether it's your brand, your website, or your next big idea.</p>
                    
                    <form className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="John Smith" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="johnsmith@gmail.com" />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>Service Needed ?</label>
                            <select>
                                <option>Select...</option>
                                <option>Web Development</option>
                                <option>UI/UX Design</option>
                                <option>AI & Automation</option>
                                <option>3D Modeling & Hardware</option>
                                <option>Consultation</option>
                                <option>Other</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>What Can I Help You...</label>
                            <textarea rows="5" placeholder="Hello, I'd like to enquire about..."></textarea>
                        </div>
                        
                        <button type="submit" className="submit-btn">SUBMIT</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
