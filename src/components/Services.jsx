import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
        number: '01',
        title: 'UI/UX Design',
        description: 'Crafting intuitive, visually stunning interfaces that prioritize user experience. From wireframes to polished prototypes, every detail is intentional.',
        items: [
            'User Interface Design',
            'Wireframing & Prototyping',
            'Interaction Design',
            'Usability Testing'
        ]
    },
    {
        number: '02',
        title: 'Web Development',
        description: 'Building fast, responsive, modern websites using cutting-edge technologies. Performance and aesthetics working in harmony.',
        items: [
            'React & Next.js',
            'Responsive Design',
            'Landing Pages',
            'Maintenance & Updates'
        ]
    },
    {
        number: '03',
        title: 'Brand Identity',
        description: 'Creating cohesive visual identities that leave lasting impressions. Your brand deserves a distinct voice in the marketplace.',
        items: [
            'Visual Identity Systems',
            'Logo Design',
            'Brand Guidelines',
            'Creative Direction'
        ]
    },
    {
        number: '04',
        title: 'AI & Innovation',
        description: 'Leveraging artificial intelligence and emerging tech to build smart, future-ready products that solve real problems.',
        items: [
            'AI Applications',
            'Workflow Automation',
            'Smart Integrations',
            '3D & Hardware'
        ]
    }
];

const Services = () => {
    const sectionRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const sectionEl = sectionRef.current;
        const servicesListEl = sectionEl.querySelector('.services-list');

        // Kill any existing ScrollTriggers for this section to handle HMR properly
        ScrollTrigger.getAll().forEach(st => {
            if (st.trigger?.classList && (st.trigger.classList.contains('services-section') || st.trigger.classList.contains('services-list'))) {
                st.kill();
            }
        });

        const ctx = gsap.context(() => {
            // Set initial state
            gsap.set('.services-headline-line', { opacity: 1, y: 0 });
            gsap.set('.service-row', { opacity: 1, y: 0 });

            gsap.from('.services-headline-line', {
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
                stagger: 0.15,
            });

            if (servicesListEl) {
                gsap.from('.service-row', {
                    scrollTrigger: {
                        trigger: servicesListEl,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out'
                });
            }
        }, sectionRef);

        return () => {
            ctx.revert();
            // Clean up ScrollTriggers
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger?.classList && (st.trigger.classList.contains('services-section') || st.trigger.classList.contains('services-list'))) {
                    st.kill();
                }
            });
        };
    }, []);

    return (
        <section ref={sectionRef} id="services" className="services-section">
            <div className="services-container">
                {/* Headline */}
                <div className="services-headline">
                    <div className="services-headline-overflow">
                        <h2 className="services-headline-line">What I</h2>
                    </div>
                    <div className="services-headline-overflow">
                        <h2 className="services-headline-line">can do.</h2>
                    </div>
                </div>

                {/* Services list — editorial accordion style */}
                <div className="services-list">
                    {servicesData.map((service, index) => (
                        <div 
                            key={index} 
                            className={`service-row ${hoveredIndex === index ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="service-row-header">
                                <span className="service-num">{service.number}</span>
                                <h3 className="service-name">{service.title}</h3>
                                <div className="service-arrow">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </div>
                            </div>
                            <div className="service-row-expand">
                                <p className="service-row-desc">{service.description}</p>
                                <div className="service-row-tags">
                                    {service.items.map((item, i) => (
                                        <span key={i} className="service-tag">{item}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
