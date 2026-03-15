import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FeaturedProjects.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        title: 'SmartCV',
        category: 'Website',
        description: 'An AI-powered platform that helps users create personalised, professional CVs in a fraction of the time.',
        color: '#1a1a2e',
        accent: '#80a0c4',
    },
    {
        title: 'Study Flow',
        category: 'Website',
        description: 'An AI-powered app that blends social media with study tools, helping students create notes, flashcards, and quizzes.',
        color: '#1a0e2e',
        accent: '#80a0c4',
    },
    {
        title: 'Launch Layer',
        category: 'Branding',
        description: 'Helping businesses grow their online presence by creating professional, custom websites tailored to their unique needs.',
        color: '#2e1a0e',
        accent: '#80a0c4',
    },
];

const FeaturedProjects = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const sectionEl = sectionRef.current;
        const projectsGridEl = sectionEl.querySelector('.projects-grid-inette');

        // Kill any existing ScrollTriggers for this section to handle HMR properly
        ScrollTrigger.getAll().forEach(st => {
            if (st.trigger?.classList && (st.trigger.classList.contains('featured-projects-section') || 
                st.trigger.classList.contains('projects-grid-inette'))) {
                st.kill();
            }
        });

        const ctx = gsap.context(() => {
            // Set initial state to ensure visibility
            gsap.set('.projects-headline-line', { opacity: 1, y: 0 });
            gsap.set('.wip-container', { opacity: 1, y: 0 });

            gsap.from('.projects-headline-line', {
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

            gsap.from('.wip-container', {
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out'
            });
        }, sectionRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger?.classList && (st.trigger.classList.contains('featured-projects-section') || 
                    st.trigger.classList.contains('projects-grid-inette'))) {
                    st.kill();
                }
            });
        };
    }, []);

    return (
        <section ref={sectionRef} id="work" className="featured-projects-section">
            <div className="projects-container">
                {/* Headline */}
                <div className="projects-headline">
                    <div className="projects-headline-overflow">
                        <h2 className="projects-headline-line">Selected</h2>
                    </div>
                    <div className="projects-headline-overflow">
                        <h2 className="projects-headline-line">works.</h2>
                    </div>
                </div>

                {/* Projects grid — replaced with WIP bar */}
                <div className="wip-container" style={{
                    width: '100%',
                    padding: '4rem 2rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px dashed rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2rem',
                    textAlign: 'center'
                }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#80a0c4" strokeWidth="1.5" style={{ marginBottom: '1rem' }}>
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                        <path d="M12 6V12L16 14" />
                    </svg>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                        fontWeight: '400',
                        color: '#f5f5f5',
                        margin: '0 0 0.5rem 0'
                    }}>Work in progress</h3>
                    <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.1rem',
                        color: '#888',
                        margin: 0
                    }}>Still designing this feature...</p>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
