import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FeaturedProjects.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        title: 'SMARTCV',
        category: 'Web Design',
        description: 'SmartCV is an AI-powered platform that helps users create personalised, professional CVs in a fraction of the time.',
        image: null,
        color: '#2a4a7f'
    },
    {
        title: 'STUDY FLOW',
        category: 'Web Design',
        description: 'Study Flow is an AI-powered app that blends social media with study tools, helping students create notes, flashcards, and quizzes.',
        image: null,
        color: '#4a2a7f'
    },
    {
        title: 'LAUNCH LAYER',
        category: 'Web Design',
        description: 'Launch Layer helps businesses grow their online presence by creating professional, custom websites tailored to their unique needs.',
        image: null,
        color: '#7f4a2a'
    }
];

const FeaturedProjects = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.projects-title', {
                scrollTrigger: {
                    trigger: '.featured-projects-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            cardsRef.current.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: 'power3.out'
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="featured-projects-section">
            <div className="projects-container">
                <h2 className="projects-title">FEATURED PROJECTS</h2>
                <p className="projects-subtitle">
                    These selected projects reflect my passion for blending strategy with creativity — 
                    solving real problems through thoughtful design and impactful storytelling.
                </p>

                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <div 
                            key={index}
                            className="project-card"
                            ref={el => cardsRef.current[index] = el}
                            style={{ '--card-color': project.color }}
                        >
                            <div className="project-image" style={{ background: project.color }}>
                                <div className="project-image-placeholder">
                                    <span className="project-initial">{project.title.charAt(0)}</span>
                                </div>
                            </div>
                            <div className="project-content">
                                <span className="project-category">{project.category}</span>
                                <h3 className="project-name">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                            </div>
                            <div className="project-hover-overlay">
                                <span className="view-project">View Project →</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="projects-cta">
                    <button className="browse-all-btn">BROWSE ALL PROJECTS</button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
