import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Beams from '../components/Beams';
import MagicBento from '../components/MagicBento';
import profileImg from '../assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial hero content animation
            gsap.from('.about-main-title', {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.3
            });

            gsap.from('.about-name', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5
            });

            gsap.from('.about-intro', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.7
            });

            // Profile card animation
            gsap.from('.profile-card', {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.9
            });

            // Section headings with scroll trigger
            gsap.utils.toArray('.section-heading').forEach((heading, index) => {
                gsap.from(heading, {
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 80%",
                        end: "top 50%",
                        toggleActions: "play none none reverse"
                    },
                    x: -50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });

            // Section text with scroll trigger
            gsap.utils.toArray('.section-text').forEach((text, index) => {
                gsap.from(text, {
                    scrollTrigger: {
                        trigger: text,
                        start: "top 85%",
                        end: "top 55%",
                        toggleActions: "play none none reverse"
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: 0.2
                });
            });

            // Closing text animation
            gsap.from('.closing-text', {
                scrollTrigger: {
                    trigger: '.closing-text',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Journey section animation
            gsap.from('.journey-title', {
                scrollTrigger: {
                    trigger: '.journey-title',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                scale: 0.9,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });

            gsap.from('.journey-text', {
                scrollTrigger: {
                    trigger: '.journey-text',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.3
            });

            // Skills section animation
            gsap.from('.skills-title', {
                scrollTrigger: {
                    trigger: '.skills-title',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                scale: 0.9,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });

            gsap.from('.bento-container', {
                scrollTrigger: {
                    trigger: '.bento-container',
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.3
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Beams
                beamWidth={2}
                beamHeight={15}
                beamNumber={12}
                lightColor="#ffffff"
                speed={2}
                noiseIntensity={1.75}
                scale={0.2}
                rotation={0}
            />
            <section ref={containerRef} className="about-page">
                <div className="about-hero-container">
                    <div className="about-hero-content">
                        <h1 className="about-main-title">ABOUT ME</h1>
                        <h2 className="about-name">RIYANSH DIWAN</h2>
                        <p className="about-intro">
                            I'm a young entrepreneur and tech enthusiast with a passion for exploring the future of AI, design, and digital tools. I love building smart, impactful projects that solve real problems — from AI-powered platforms to productivity tools that empower students and creators. I'm always learning, experimenting, and pushing ideas forward.
                        </p>
                    </div>

                    <div className="profile-card">
                        <div className="card-inner">
                            <img src={profileImg} alt="Riyansh Diwan" className="profile-image" />
                        </div>
                    </div>
                </div>

                <div className="journey-section">
                    <h2 className="journey-title">DISCOVER MY JOURNEY</h2>
                    <p className="journey-text">
                        My journey started when I was first introduced to web development and AI — two fields that instantly captured my curiosity. From experimenting with coding and building simple projects, my passion grew rapidly. Since then, I've been driven to explore the endless possibilities technology offers, constantly learning and creating innovative solutions along the way.
                    </p>
                </div>
                    
                <div className="skills-section">
                    <h2 className="skills-title">MY SKILLS</h2>
                    <div className="bento-container">
                        <MagicBento 
                            textAutoHide={true}
                            enableStars={true}
                            enableSpotlight={true}
                            enableBorderGlow={true}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                            spotlightRadius={300}
                            particleCount={12}
                            glowColor="132, 0, 255"
                        />
                    </div>
                </div>
            </section>

            <style>{`
                .about-page {
                    position: relative;
                    min-height: 100vh;
                    width: 100%;
                    padding: 0;
                    margin: 0;
                    background: transparent;
                }
                
                .about-hero-container {
                    position: relative;
                    z-index: 10;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 150px 4rem 100px;
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 4rem;
                    align-items: start;
                }
                
                .about-hero-content {
                    max-width: 650px;
                }
                
                .journey-section {
                    position: relative;
                    z-index: 10;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 4rem 100px;
                }
                
                .about-main-title {
                    font-size: clamp(4rem, 10vw, 6rem);
                    font-family: 'Teko', sans-serif;
                    text-transform: uppercase;
                    margin-bottom: 2rem;
                    line-height: 0.9;
                    color: #fff;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                }
                
                .about-name {
                    font-size: clamp(1.5rem, 3vw, 1.75rem);
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-bottom: 1.5rem;
                    color: #fff;
                    letter-spacing: 0.1em;
                }
                
                .about-intro {
                    font-size: clamp(1.125rem, 2vw, 1.25rem);
                    line-height: 1.8;
                    color: #b0b0b0;
                    font-weight: 300;
                    margin-bottom: 3rem;
                    max-width: 600px;
                }
                
                .section-heading {
                    font-size: clamp(1.5rem, 2.5vw, 1.75rem);
                    font-weight: 600;
                    text-transform: uppercase;
                    margin: 2.5rem 0 1rem;
                    color: #fff;
                    letter-spacing: 0.05em;
                }
                
                .section-text {
                    font-size: clamp(1.125rem, 2vw, 1.25rem);
                    line-height: 1.8;
                    color: #b0b0b0;
                    font-weight: 300;
                    margin-bottom: 1.5rem;
                    border-left: 3px solid #6d28d9;
                    padding-left: 1.5rem;
                }
                
                .closing-text {
                    font-size: clamp(1.125rem, 2vw, 1.25rem);
                    line-height: 1.8;
                    color: #d0d0d0;
                    font-weight: 300;
                    margin-top: 3rem;
                    font-style: italic;
                    border-left: 3px solid #6d28d9;
                    padding-left: 1.5rem;
                }
                
                .journey-title {
                    font-size: clamp(3rem, 8vw, 5rem);
                    font-family: 'Teko', sans-serif;
                    text-transform: uppercase;
                    margin-top: 0;
                    margin-bottom: 2rem;
                    line-height: 1.1;
                    color: #fff;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                }
                
                .journey-section {
                    position: relative;
                    z-index: 10;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 100px 4rem 50px;
                }
                
                .journey-text {
                    font-size: clamp(1.125rem, 2vw, 1.375rem);
                    line-height: 1.8;
                    color: #b0b0b0;
                    font-weight: 300;
                    max-width: 900px;
                }
                
                .skills-section {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    padding: 0 2rem 100px;
                }
                
                .skills-title {
                    font-size: clamp(3rem, 8vw, 5rem);
                    font-family: 'Teko', sans-serif;
                    text-transform: uppercase;
                    margin: 0 auto 3rem;
                    line-height: 1.1;
                    color: #fff;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    max-width: 1600px;
                }
                
                .bento-container {
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 0;
                }
                .skills-title {
                    font-size: clamp(3rem, 8vw, 5rem);
                    font-family: 'Teko', sans-serif;
                    text-transform: uppercase;
                    margin: 0 auto 3rem;
                    line-height: 1.1;
                    color: #fff;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    max-width: 1600px;
                }
                
                .bento-container {
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 0;
                }
                
                .profile-card {
                    position: sticky;
                    top: 150px;
                    width: 100%;
                    max-width: 400px;
                    height: fit-content;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 2rem;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    align-self: start;
                }
                
                .card-inner {
                    width: 100%;
                    aspect-ratio: 3/4;
                    border-radius: 16px;
                    overflow: hidden;
                    background: #fff;
                }
                
                .profile-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                
                @media (max-width: 1200px) {
                    .about-hero-container {
                        grid-template-columns: 1fr;
                        padding: 120px 3rem 80px;
                    }
                    
                    .journey-section {
                        padding: 50px 3rem 50px;
                    }
                    
                    .skills-section {
                        padding: 0 1rem 80px;
                    }
                    
                    .profile-card {
                        position: relative;
                        top: 0;
                        max-width: 350px;
                        margin: 0 auto;
                    }
                }
                
                @media (max-width: 768px) {
                    .about-hero-container {
                        padding: 120px 2rem 60px;
                        gap: 3rem;
                    }
                    
                    .journey-section {
                        padding: 50px 2rem 30px;
                    }
                    
                    .skills-section {
                        padding: 0 1rem 60px;
                    }
                    
                    .about-intro,
                    .section-text,
                    .closing-text {
                        padding-left: 1rem;
                    }
                    
                    .profile-card {
                        max-width: 300px;
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </>
    );
};

export default AboutPage;
