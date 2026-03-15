import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const sectionEl = sectionRef.current;
        const descEl = sectionEl.querySelector('.about-desc-block');
        const statsEl = sectionEl.querySelector('.about-stats');
        const capabilitiesEl = sectionEl.querySelector('.about-capabilities');

        // Kill any existing ScrollTriggers for this section to handle HMR properly
        ScrollTrigger.getAll().forEach(st => {
            if (st.trigger?.classList && (st.trigger.classList.contains('about-section') || 
                st.trigger.classList.contains('about-desc-block') ||
                st.trigger.classList.contains('about-stats') ||
                st.trigger.classList.contains('about-capabilities'))) {
                st.kill();
            }
        });

        const ctx = gsap.context(() => {
            // Set initial state to ensure visibility
            gsap.set('.about-headline-line', { opacity: 1, y: 0 });
            gsap.set('.about-desc-block', { opacity: 1, y: 0 });
            gsap.set('.about-stat', { opacity: 1, y: 0 });
            gsap.set('.about-capability', { opacity: 1, y: 0 });

            // Headline reveal
            gsap.from('.about-headline-line', {
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
                stagger: 0.15,
            });

            // Description reveal
            if (descEl) {
                gsap.from('.about-desc-block', {
                    scrollTrigger: {
                        trigger: descEl,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                });
            }

            // Stats reveal
            if (statsEl) {
                gsap.from('.about-stat', {
                    scrollTrigger: {
                        trigger: statsEl,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.1,
                });
            }

            // Capabilities reveal
            if (capabilitiesEl) {
                gsap.from('.about-capability', {
                    scrollTrigger: {
                        trigger: capabilitiesEl,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: 0.08,
                });
            }
        }, sectionRef);

        return () => {
            ctx.revert();
            // Clean up ScrollTriggers
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger?.classList && (st.trigger.classList.contains('about-section') || 
                    st.trigger.classList.contains('about-desc-block') ||
                    st.trigger.classList.contains('about-stats') ||
                    st.trigger.classList.contains('about-capabilities'))) {
                    st.kill();
                }
            });
        };
    }, []);

    return (
        <section ref={sectionRef} id="about" className="about-section">
            <div className="about-container">
                {/* Large editorial headline */}
                <div className="about-headline">
                    <div className="about-headline-overflow">
                        <h2 className="about-headline-line">Crafting digital</h2>
                    </div>
                    <div className="about-headline-overflow">
                        <h2 className="about-headline-line">experiences that</h2>
                    </div>
                    <div className="about-headline-overflow">
                        <h2 className="about-headline-line accent">resonate.</h2>
                    </div>
                </div>

                {/* Two-column description */}
                <div className="about-desc-block">
                    <div className="about-desc-label">ABOUT</div>
                    <div className="about-desc-columns">
                        <p className="about-desc-text">
                            I'm Riyansh — a digital designer and developer passionate about crafting
                            meaningful and impactful digital experiences. I believe in the power of
                            design to shape perception and drive real business results.
                        </p>
                        <p className="about-desc-text">
                            With a focus on clean aesthetics, precise typography, and thoughtful
                            interaction design, I help brands establish a strong visual presence
                            that connects deeply with their audience.
                        </p>
                    </div>
                </div>

                {/* Stats row */}
                <div className="about-stats">
                    <div className="about-stat">
                        <span className="about-stat-number">2+</span>
                        <span className="about-stat-label">Years Experience</span>
                    </div>
                    <div className="about-stat">
                        <span className="about-stat-number">100%</span>
                        <span className="about-stat-label">Client Satisfaction</span>
                    </div>
                </div>

                {/* Capabilities */}
                <div className="about-capabilities">
                    <div className="about-cap-label">CAPABILITIES</div>
                    <div className="about-cap-list">
                        {['UI/UX Design', 'Web Development', 'Brand Identity', 'AI & Automation', 'Creative Direction', '3D & Hardware'].map((cap) => (
                            <span key={cap} className="about-capability">{cap}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
