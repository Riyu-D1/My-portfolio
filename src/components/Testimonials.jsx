import { useRef, useEffect, useState } from 'react';
import './Testimonials.css';

const testimonialsData = [
    {
        text: "Riyansh truly understood my vision and turned it into impactful designs. The results went beyond my expectations!",
        name: "John Harris",
        role: "Marketing Director",
    },
    {
        text: "His design skills are amazing. He transformed my ideas into a high-performing, visually striking website.",
        name: "Sarah Johnson",
        role: "CEO",
    },
    {
        text: "He took the time to understand our goals and delivered a design that resonated perfectly with our audience.",
        name: "Michael Lee",
        role: "Product Manager",
    },
    {
        text: "As a small business owner, I appreciated how stress-free Riyansh made the process.",
        name: "Laura Bennett",
        role: "Small Business Owner",
    }
];

const Testimonials = () => {
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
        <section ref={sectionRef} className={`testimonials-section ${isVisible ? 'visible' : ''}`}>
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <div className="testimonials-label">TESTIMONIALS</div>
                    <h2 className="testimonials-title">Client Stories</h2>
                </div>

                <div className="testimonials-grid">
                    {testimonialsData.map((testimonial, index) => (
                        <div key={index} className="testimonial-card" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="author-info">
                                    <div className="author-name">{testimonial.name}</div>
                                    <div className="author-role">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
