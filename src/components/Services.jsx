import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
        number: '01',
        title: 'UI/UX DESIGN',
        items: [
            'Wireframing and prototyping',
            'User Interface design for web and mobile apps',
            'Usability testing and user feedback analysis',
            'Interaction design and micro-animations'
        ]
    },
    {
        number: '02',
        title: 'WEB DEVELOPMENT',
        items: [
            'Responsive website development',
            'React and Next.js applications',
            'Landing page design and optimization',
            'Website maintenance and updates'
        ]
    },
    {
        number: '03',
        title: 'AI & AUTOMATION',
        items: [
            'AI-powered application development',
            'Workflow automation solutions',
            'Smart tool integrations',
            'Data-driven product features'
        ]
    },
    {
        number: '04',
        title: '3D & HARDWARE',
        items: [
            '3D printing and prototyping',
            'Hardware tinkering projects',
            'Physical product design',
            'Technical documentation'
        ]
    }
];

const Services = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section title
            gsap.from('.services-title', {
                scrollTrigger: {
                    trigger: '.services-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.services-subtitle', {
                scrollTrigger: {
                    trigger: '.services-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out'
            });

            // Animate service cards with stagger
            cardsRef.current.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 80,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out'
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="services-section">
            <div className="services-container">
                <h2 className="services-title">WHAT I CAN DO FOR YOU</h2>
                <p className="services-subtitle">
                    As a digital designer and developer, I craft experiences that connect deeply and spark creativity.
                </p>

                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div 
                            key={index} 
                            className="service-card"
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div className="service-header">
                                <span className="service-number">{service.number}</span>
                                <h3 className="service-title">{service.title}</h3>
                            </div>
                            <ul className="service-list">
                                {service.items.map((item, i) => (
                                    <li key={i} className="service-item">
                                        <span className="service-icon">✦</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
