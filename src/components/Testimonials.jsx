import { useRef, useEffect, useState } from 'react';
import './Testimonials.css';

const testimonialsData = [
    {
        text: "Riyansh truly understood my vision and turned it into impactful designs. The results went beyond my expectations!",
        name: "John Harris",
        role: "Marketing Director",
        rating: 5
    },
    {
        text: "His design skills are amazing. He transformed my ideas into a high-performing, visually striking website.",
        name: "Sarah Johnson",
        role: "CEO",
        rating: 5
    },
    {
        text: "He took the time to understand our goals and delivered a design that resonated perfectly with our audience.",
        name: "Michael Lee",
        role: "Product Manager",
        rating: 5
    },
    {
        text: "As a small business owner, I appreciated how stress-free Riyansh made the process.",
        name: "Laura Bennett",
        role: "Small Business Owner",
        rating: 5
    }
];

const statsData = [
    { value: 100, suffix: '%', label: 'Satisfaction Rate' },
    { value: 200, suffix: '%', label: 'Client Growth' },
    { value: 50, suffix: '+', label: 'Happy Clients' }
];

const Testimonials = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState(statsData.map(() => 0));
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                    
                    // Start counter animations
                    statsData.forEach((stat, index) => {
                        const duration = 1500;
                        const startTime = Date.now();
                        
                        const animate = () => {
                            const elapsed = Date.now() - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const current = Math.round(stat.value * progress);
                            
                            setCounters(prev => {
                                const newCounters = [...prev];
                                newCounters[index] = current;
                                return newCounters;
                            });
                            
                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            }
                        };
                        
                        animate();
                    });
                    
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

    const renderStars = (count) => {
        return Array(count).fill(0).map((_, i) => (
            <span key={i} className="star">★</span>
        ));
    };

    return (
        <section ref={sectionRef} className={`testimonials-section ${isVisible ? 'visible' : ''}`}>
            <div className="testimonials-container">
                <h2 className="testimonials-title">WHAT MY CLIENTS SAY</h2>
                <p className="testimonials-subtitle">
                    Here's what my clients have shared about their experiences working with me.
                    Their trust and satisfaction motivate me to continue delivering designs that make an impact.
                </p>

                <div className="stats-container">
                    {statsData.map((stat, index) => (
                        <div key={index} className="stat-item" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                            <div className="stat-value">
                                {counters[index]}{stat.suffix}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="testimonials-grid">
                    {testimonialsData.map((testimonial, index) => (
                        <div key={index} className="testimonial-card" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                            <div className="testimonial-stars">
                                {renderStars(testimonial.rating)}
                            </div>
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
