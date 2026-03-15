import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Beams from '../components/Beams';
import FlowingMenu from '../components/FlowingMenu';
import PixelTransition from '../components/PixelTransition';
import memojiImg from '../assets/memoji.png';
import photoImg from '../assets/profile.png';
import productDesignImg from '../assets/product-design.png';
import codeImg from '../assets/code.png';
import photography1 from '../assets/photography1.jpg';
import photography2 from '../assets/photography2.jpg';
import photography3 from '../assets/photography3.jpg';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const containerRef = useRef(null);
    
    const demoItems = [
        { link: '#', text: 'Product Design', image: productDesignImg, description: 'My product design work focuses on creating practical, well-thought-out physical products. I enjoy taking an idea from concept to prototype, using tools like 3D modeling and 3D printing to test and refine designs. My goal is to build products that are functional, efficient, and thoughtfully designed, while constantly experimenting with new materials, forms, and ways to improve how things are made and used.' },
        { link: '#', text: 'Code', image: codeImg, description: 'My work in code focuses on building clean, efficient, and purposeful digital solutions. I enjoy turning ideas into functional tools by designing and developing software that is reliable, scalable, and easy to use. From experimenting with new technologies to refining the details of how a system works, I approach coding as both a technical challenge and a creative process.' },
        { link: '#', text: 'Photography', image: [photography1, photography2, photography3], description: 'Photography is a creative outlet where I enjoy capturing unique perspectives and moments. I focus on composition, lighting, and detail to create images that feel natural and expressive. It’s a way for me to explore creativity outside of technology while still applying the same attention to detail and design thinking.' }
    ];

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
                            I'm a young entrepreneur and tech enthusiast passionate about exploring the future of AI, design, and digital tools. I enjoy building smart, impactful projects that solve real problems — from AI-powered platforms to productivity tools that help students and creators work better. Alongside software development, I experiment with hardware and 3D printing to bring ideas into the physical world, combining digital design with real-world prototypes. I’m constantly learning, experimenting, and pushing ideas forward, always looking for new ways technology can make life simpler, smarter, and more creative. I also enjoy photography as a way to capture perspective and creativity outside of tech.
                        </p>
                    </div>
                </div>

                <div className="journey-section">
                    <h2 className="journey-title">DISCOVER MY JOURNEY</h2>
                    <p className="journey-text">
                        My journey started when I was first introduced to web development and AI — two fields that instantly captured my curiosity. From experimenting with coding and building simple projects, my passion grew rapidly. Since then, I've been driven to explore the endless possibilities technology offers, constantly learning and creating innovative solutions along the way.
                    </p>
                </div>

                <div className="skills-section" style={{ position: 'relative', margin: '4rem 0' }}>
                    <FlowingMenu items={demoItems}
                        speed={15}
                        textColor="#ffffff"
                        bgColor="#0f1115"
                        marqueeBgColor="#ffffff"
                        marqueeTextColor="#060010"
                        borderColor="#ffffff"
                    />
                </div>

                <div className="contact-section">
                    <div className="contact-container">
                        <div className="contact-image-wrapper">
                            <PixelTransition
                                firstContent={
                                    <img
                                        src={memojiImg}
                                        alt="Riyansh Diwan Memoji"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', backgroundColor: '#f5f5f5' }}
                                    />
                                }
                                secondContent={
                                    <img
                                        src={photoImg}
                                        alt="Riyansh Diwan"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
                                    />
                                }
                                gridSize={12}
                                pixelColor="#80a0c4"
                                once={false}
                                animationStepDuration={0.4}
                                className="contact-pixel-image"
                                aspectRatio="120%"
                            />
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

                .contact-pixel-image.pixelated-image-card {
                    width: 100%;
                    max-width: 500px;
                    background-color: transparent;
                    border: none;
                    border-radius: 20px;
                    transition: transform 0.4s ease;
                }

                .contact-pixel-image.pixelated-image-card:hover {
                    transform: scale(1.02);
                }

                .contact-pixel-image.pixelated-image-card:focus {
                    outline: none;
                }
                
                .wave-icon {
                    position: absolute;
                    bottom: -30px;
                    left: -30px;
                    width: 80px;
                    height: 80px;
                    background: #80a0c4;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    box-shadow: 0 4px 20px rgba(128, 160, 196, 0.3);
                    z-index: 10;
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
                        padding: 100px 1.5rem 50px;
                        gap: 2.5rem;
                    }
                    
                    .journey-section {
                        padding: 40px 1.5rem 30px;
                    }
                    
                    .skills-section {
                        padding: 0 1rem 50px;
                    }

                    .about-main-title {
                        font-size: clamp(3rem, 12vw, 4rem);
                    }

                    .about-name {
                        font-size: clamp(1.2rem, 4vw, 1.5rem);
                    }

                    .about-intro {
                        font-size: 0.95rem;
                    }

                    .journey-title,
                    .skills-title {
                        font-size: clamp(2rem, 8vw, 3rem);
                    }

                    .journey-text {
                        font-size: 0.95rem;
                    }
                    
                    .about-intro,
                    .section-text,
                    .closing-text {
                        padding-left: 1rem;
                    }
                    
                    .profile-card {
                        max-width: 280px;
                        padding: 1.25rem;
                    }
                    
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                    
                    .contact-section {
                        padding: 50px 1.5rem;
                    }

                    .contact-title {
                        font-size: clamp(2rem, 8vw, 3rem);
                        text-align: center;
                    }

                    .contact-subtitle {
                        text-align: center;
                        font-size: 0.95rem;
                        margin-bottom: 2rem;
                    }

                    .contact-image {
                        max-width: 280px;
                    }

                    .wave-icon {
                        width: 60px;
                        height: 60px;
                        font-size: 1.75rem;
                        bottom: -20px;
                        left: -10px;
                    }

                    .submit-btn {
                        align-self: center;
                        width: 100%;
                    }
                }

                @media (max-width: 480px) {
                    .about-hero-container {
                        padding: 90px 1rem 40px;
                    }
                    
                    .journey-section {
                        padding: 30px 1rem 20px;
                    }
                    
                    .skills-section {
                        padding: 0 0.75rem 40px;
                    }

                    .about-main-title {
                        font-size: clamp(2.5rem, 14vw, 3.5rem);
                    }

                    .about-name {
                        font-size: clamp(1rem, 5vw, 1.25rem);
                    }

                    .about-intro,
                    .journey-text {
                        font-size: 0.875rem;
                    }

                    .journey-title,
                    .skills-title {
                        font-size: clamp(1.75rem, 10vw, 2.5rem);
                    }

                    .skills-subtitle {
                        font-size: 0.875rem;
                    }
                    
                    .about-intro,
                    .section-text,
                    .closing-text {
                        padding-left: 0.75rem;
                        border-left-width: 2px;
                    }
                    
                    .profile-card {
                        max-width: 240px;
                        padding: 1rem;
                    }
                    
                    .contact-section {
                        padding: 40px 1rem;
                    }

                    .contact-title {
                        font-size: clamp(1.75rem, 10vw, 2.5rem);
                    }

                    .contact-subtitle {
                        font-size: 0.85rem;
                    }

                    .contact-image {
                        max-width: 220px;
                    }

                    .wave-icon {
                        width: 50px;
                        height: 50px;
                        font-size: 1.5rem;
                    }

                    .form-group label {
                        font-size: 0.8rem;
                    }

                    .form-group input,
                    .form-group select,
                    .form-group textarea {
                        padding: 0.875rem;
                        font-size: 0.9rem;
                    }

                    .submit-btn {
                        padding: 0.875rem 2rem;
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </>
    );
};

export default AboutPage;
