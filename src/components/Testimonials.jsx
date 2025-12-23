import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [counters, setCounters] = useState(statsData.map(() => 0));

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title
            gsap.from('.testimonials-title', {
                scrollTrigger: {
                    trigger: '.testimonials-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            // Animate stats with counter
            statsData.forEach((stat, index) => {
                gsap.to({}, {
                    scrollTrigger: {
                        trigger: '.stats-container',
                        start: 'top 80%',
                        onEnter: () => {
                            gsap.to({}, {
                                duration: 2,
                                ease: 'power2.out',
                                onUpdate: function() {
                                    const progress = this.progress();
                                    setCounters(prev => {
                                        const newCounters = [...prev];
                                        newCounters[index] = Math.round(stat.value * progress);
                                        return newCounters;
                                    });
                                }
                            });
                        }
                    }
                });
            });

            // Animate testimonial cards
            gsap.from('.testimonial-card', {
                scrollTrigger: {
                    trigger: '.testimonials-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const renderStars = (count) => {
        return Array(count).fill(0).map((_, i) => (
            <span key={i} className="star">★</span>
        ));
    };

    return (
        <section ref={sectionRef} className="testimonials-section">
            <div className="testimonials-container">
                <h2 className="testimonials-title">WHAT MY CLIENTS SAY</h2>
                <p className="testimonials-subtitle">
                    Here's what my clients have shared about their experiences working with me.
                    Their trust and satisfaction motivate me to continue delivering designs that make an impact.
                </p>

                <div className="stats-container">
                    {statsData.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <div className="stat-value">
                                {counters[index]}{stat.suffix}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="testimonials-grid">
                    {testimonialsData.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
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
