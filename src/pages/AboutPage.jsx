import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Beams from '../components/Beams';
import MagicBento from '../components/MagicBento';
import profileImg from '../assets/memoji.png';

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
                </div>

                <div className="journey-section">
                    <h2 className="journey-title">DISCOVER MY JOURNEY</h2>
                    <p className="journey-text">
                        My journey started when I was first introduced to web development and AI — two fields that instantly captured my curiosity. From experimenting with coding and building simple projects, my passion grew rapidly. Since then, I've been driven to explore the endless possibilities technology offers, constantly learning and creating innovative solutions along the way.
                    </p>
                </div>
                    
                <div className="skills-section">
                    <h2 className="skills-title">DESIGN WITH STRATEGY AND CREATIVITY</h2>
                    <p className="skills-subtitle">My process blends strategy and creativity to address challenges, craft solutions, and deliver designs that effectively communicate your message.</p>
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
                            glowColor="186, 203, 219"
                        />
                    </div>
                </div>

                <div className="contact-section">
                    <div className="contact-container">
                        <div className="contact-image-wrapper">
                            <img src={profileImg} alt="Riyansh Diwan" className="contact-image" />
                            <div className="wave-icon">👋</div>
                        </div>
                        
                        <div className="contact-form-wrapper">
                            <h2 className="contact-title">LET'S WORK TOGETHER</h2>
                            <p className="contact-subtitle">Let's build something impactful together—whether it's your brand, your website, or your next big idea.</p>
                            
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
                </div>
            </section>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                
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
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 150px 4rem 0px;
                    text-align: center;
                }
                
                .about-hero-content {
                    max-width: 100%;
                }
                
                .journey-section {
                    position: relative;
                    z-index: 10;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0px 4rem 100px;
                    text-align: center;
                }
                
                .about-main-title {
                    font-size: clamp(4rem, 10vw, 6rem);
                    font-family: 'Bebas Neue', sans-serif;
                    text-transform: uppercase;
                    margin-bottom: 2rem;
                    line-height: 0.9;
                    color: #fff;
                    font-weight: 400;
                    letter-spacing: 0.02em;
                }
                
                .about-name {
                    font-size: clamp(1.5rem, 3vw, 1.75rem);
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 1.5rem;
                    color: #fff;
                    letter-spacing: 0.15em;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
                }
                
                .about-intro {
                    font-size: clamp(1rem, 2vw, 1.125rem);
                    line-height: 1.7;
                    color: #b0b0b0;
                    font-weight: 400;
                    margin-bottom: 1rem;
                    max-width: 100%;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
                    border-left: 3px solid #bacbdb;
                    padding-left: 1.5rem;
                    text-align: left;
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
                    border-left: 3px solid #bacbdb;
                    padding-left: 1.5rem;
                }
                
                .closing-text {
                    font-size: clamp(1.125rem, 2vw, 1.25rem);
                    line-height: 1.8;
                    color: #d0d0d0;
                    font-weight: 300;
                    margin-top: 3rem;
                    font-style: italic;
                    border-left: 3px solid #bacbdb;
                    padding-left: 1.5rem;
                }
                
                .journey-title {
                    font-size: clamp(3rem, 8vw, 5rem);
                    font-family: 'Bebas Neue', sans-serif;
                    text-transform: uppercase;
                    margin: 2rem 0 2rem 0;
                    line-height: 1.1;
                    color: #fff;
                    font-weight: 400;
                    letter-spacing: 0.02em;
                }
                
                .journey-text {
                    font-size: clamp(1rem, 2vw, 1.125rem);
                    line-height: 1.7;
                    color: #b0b0b0;
                    font-weight: 400;
                    max-width: 100%;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
                    border-left: 3px solid #bacbdb;
                    padding-left: 1.5rem;
                    text-align: left;
                }
                
                .skills-section {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    padding: 0 2rem 100px;
                }
                
                .skills-title {
                    font-size: clamp(3rem, 8vw, 5rem);
                    font-family: 'Bebas Neue', sans-serif;
                    text-transform: uppercase;
                    margin: 0 auto 1.5rem;
                    line-height: 1.1;
                    color: #fff;
                    font-weight: 400;
                    letter-spacing: 0.02em;
                    max-width: 1600px;
                    text-align: center;
                }
                
                .skills-subtitle {
                    font-size: clamp(1rem, 2vw, 1.125rem);
                    line-height: 1.7;
                    color: #b0b0b0;
                    font-weight: 400;
                    max-width: 800px;
                    margin: 0 auto 4rem;
                    text-align: center;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
                }
                
                .bento-container {
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 0;
                }
                    padding: 0;
                }
                
                .profile-card {
                    position: sticky;
                    top: 150px;
                    width: 100%;
                    max-width: 400px;
                    height: fit-content;
                    max-height: calc(100vh - 200px);
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
                
                .contact-section {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    padding: 100px 4rem;
                    background: transparent;
                }
                
                .contact-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: center;
                }
                
                .contact-image-wrapper {
                    position: relative;
                }
                
                .contact-image {
                    width: 100%;
                    max-width: 500px;
                    height: auto;
                    border-radius: 20px;
                    object-fit: cover;
                }
                
                .wave-icon {
                    position: absolute;
                    bottom: -30px;
                    left: -30px;
                    width: 80px;
                    height: 80px;
                    background: #bacbdb;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    box-shadow: 0 4px 20px rgba(186, 203, 219, 0.3);
                }
                
                .contact-form-wrapper {
                    max-width: 600px;
                }
                
                .contact-title {
                    font-size: clamp(3rem, 8vw, 5rem);
                    font-family: 'Bebas Neue', sans-serif;
                    text-transform: uppercase;
                    margin: 0 0 1rem 0;
                    line-height: 1.1;
                    color: #fff;
                    font-weight: 400;
                    letter-spacing: 0.02em;
                }
                
                .contact-subtitle {
                    font-size: clamp(1rem, 2vw, 1.125rem);
                    line-height: 1.7;
                    color: #b0b0b0;
                    font-weight: 400;
                    margin-bottom: 3rem;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
                }
                
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .form-group label {
                    font-size: 0.875rem;
                    color: #bacbdb;
                    font-weight: 500;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
                }
                
                .form-group input,
                .form-group select,
                .form-group textarea {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    padding: 1rem;
                    color: #fff;
                    font-size: 1rem;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
                    transition: all 0.3s ease;
                }
                
                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #bacbdb;
                    background: rgba(255, 255, 255, 0.08);
                }
                
                .form-group input::placeholder,
                .form-group textarea::placeholder {
                    color: rgba(255, 255, 255, 0.3);
                }
                
                .form-group select {
                    cursor: pointer;
                }
                
                .form-group textarea {
                    resize: vertical;
                    min-height: 120px;
                }
                
                .submit-btn {
                    background: transparent;
                    border: 2px solid #bacbdb;
                    color: #bacbdb;
                    padding: 1rem 3rem;
                    border-radius: 50px;
                    font-size: 1rem;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    align-self: flex-start;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
                    text-transform: uppercase;
                }
                
                .submit-btn:hover {
                    background: #bacbdb;
                    color: #000;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 20px rgba(186, 203, 219, 0.3);
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
                    
                    .contact-container {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }
                    
                    .contact-image {
                        max-width: 400px;
                        margin: 0 auto;
                        display: block;
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
                    
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                    
                    .contact-section {
                        padding: 60px 2rem;
                    }
                }
            `}</style>
        </>
    );
};

export default AboutPage;
