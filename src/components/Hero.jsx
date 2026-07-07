import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import PixelTransition from './PixelTransition';
import TextPressure from './TextPressure';
import Grainient from '../component/Grainient';
import profileImg from '../assets/profile.png';
import memojiImg from '../assets/memoji.png';
import './Hero.css';

const Hero = () => {
    const sectionRef = useRef(null);
    const heroTextRef = useRef(null);
    const serviceBlocksRef = useRef(null);
    const ctaRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial state to ensure visibility after HMR
            gsap.set('.hero-title-line', { opacity: 1, y: 0 });
            gsap.set('.hero-profile-image', { opacity: 1, y: 0 });
            gsap.set('.hero-service-block', { opacity: 1, y: 0 });
            gsap.set('.hero-cta-area', { opacity: 1, y: 0 });
            gsap.set('.hero-scroll-indicator', { opacity: 1, y: 0 });
            gsap.set('.hero-top-bar', { opacity: 1, y: 0 });

            const tl = gsap.timeline({ delay: 0.6 });

            // Reveal the hero headline letters
            tl.from('.hero-title-line', {
                y: 120,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out',
                stagger: 0.15,
            })
                        .from('.hero-profile-image', {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: 'power3.out',
            }, '-=0.9')
            .from('.hero-service-block', {
                y: 60,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.12,
            }, '-=0.6')
            .from('.hero-cta-area', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.4')
            .from('.hero-scroll-indicator', {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power3.out',
            }, '-=0.3')
            .from('.hero-top-bar', {
                opacity: 0,
                y: -20,
                duration: 0.6,
                ease: 'power3.out',
            }, '-=0.8');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" className="hero-section" ref={sectionRef}>
            {/* Grainient Background */}
            <Grainient
                color1="#80a0c4"
                color2="#0f0f0f"
                color3="#f1f5f9"
                className="hero-grainient-bg"
            />
            <div className="hero-container">
                {/* Top bar with name and availability */}
                <div className="hero-top-bar">
                    <span className="hero-name">Riyansh Diwan</span>
                    <span className="hero-availability">
                        <span className="hero-avail-dot"></span>
                        Available for projects
                    </span>
                </div>

                {/* Main hero headline */}
                <div className="hero-headline" ref={heroTextRef}>
                    <div className="hero-title-line-wrapper hero-title-line">
                        <TextPressure
                            text="CREATIVE"
                            flex
                            alpha={false}
                            stroke={false}
                            width
                            weight
                            italic
                            textColor="#f5f5f5"
                            minFontSize={48}
                        />
                    </div>
                    <div className="hero-title-line-wrapper hero-title-line">
                        <TextPressure
                            text="DESIGNER"
                            flex
                            alpha={false}
                            stroke={false}
                            width
                            weight
                            italic
                            textColor="#f5f5f5"
                            minFontSize={48}
                        />
                    </div>
                    <PixelTransition
                        firstContent={
                            <img
                                src={profileImg}
                                alt="Riyansh Diwan"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                            />
                        }
                        secondContent={
                            <img
                                src={memojiImg}
                                alt="Riyansh Diwan Memoji"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', backgroundColor: '#f5f5f5' }}
                            />
                        }
                        gridSize={12}
                        pixelColor="#f5f5f5"
                        once={false}
                        animationStepDuration={0.4}
                        className="hero-profile-image"
                        aspectRatio="130%"
                    />
                </div>

                {/* Service category blocks — Inette-style */}
                <div className="hero-services" ref={serviceBlocksRef}>
                    <div className="hero-service-block">
                        <h3 className="hero-service-label">WEBSITE</h3>
                        <div className="hero-service-content">
                            <span className="hero-service-bullet">●</span>
                            <p className="hero-service-desc">
                                Focused on creating visually stunning interfaces and exceptional user
                                experiences. Every pixel is crafted for user-friendly, efficient, and meaningful products.
                            </p>
                        </div>
                    </div>

                    <div className="hero-service-divider"></div>

                    <div className="hero-service-block">
                        <h3 className="hero-service-label">BRAND</h3>
                        <div className="hero-service-content">
                            <span className="hero-service-bullet">●</span>
                            <p className="hero-service-desc">
                                It forms the foundation of your company's identity, influencing every
                                decision and ensuring a cohesive, impactful presence in the marketplace.
                            </p>
                        </div>
                    </div>

                    <div className="hero-service-divider"></div>

                    <div className="hero-service-block">
                        <h3 className="hero-service-label">VISUAL</h3>
                        <div className="hero-service-content">
                            <span className="hero-service-bullet">●</span>
                            <p className="hero-service-desc">
                                A brand's visual identity is its distinct visual language, designed to leave
                                lasting impressions and foster emotional connections with the audience.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA area */}
                <div className="hero-cta-area">
                    <a href="#contact" className="hero-cta-btn">
                        <span>Let's Talk</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </a>
                    <div className="hero-cta-meta">
                        <span>Based in India</span>
                        <span className="hero-meta-sep">—</span>
                        <span>© 2025</span>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
                    <div className="hero-scroll-line"></div>
                    <span>scroll</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
