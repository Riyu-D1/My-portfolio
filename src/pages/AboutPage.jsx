import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Beams from '../components/Beams';

const AboutPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-content > *', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="about-page">
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
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
            </div>
            <div className="container about-content">
                <h1>About Me</h1>
                <p className="large-text">
                    I am Riyansh Diwan, a creative developer and interaction designer passionate about building digital experiences that feel alive.
                </p>
                <div className="about-details">
                    <div className="detail-block">
                        <h3>Background</h3>
                        <p>
                            With a strong foundation in both design and engineering, I bridge the gap between aesthetics and functionality.
                            My journey began with a curiosity for how things work, evolving into a love for creating immersive web interfaces.
                        </p>
                    </div>
                    <div className="detail-block">
                        <h3>Approach</h3>
                        <p>
                            I believe in user-centric design powered by robust code. I specialize in React, WebGL, and animation libraries
                            like GSAP and Framer Motion to bring ideas to life.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .about-page {
                    position: relative;
                    min-height: 100vh;
                    padding-top: 150px; /* Space for fixed header */
                    padding-bottom: 50px;
                    background: #050505;
                    color: #e0e0e0;
                }{
                    position: relative;
                    z-index: 1;
                }
                .about-content 
                .about-content h1 {
                    font-size: clamp(3rem, 8vw, 6rem);
                    font-family: 'Teko', sans-serif;
                    text-transform: uppercase;
                    margin-bottom: 2rem;
                    line-height: 0.9;
                }
                .large-text {
                    font-size: clamp(1.5rem, 3vw, 2.5rem);
                    line-height: 1.3;
                    max-width: 900px;
                    margin-bottom: 4rem;
                    font-weight: 300;
                    opacity: 0.9;
                }
                .about-details {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 3rem;
                    max-width: 1000px;
                }
                .detail-block h3 {
                    font-size: 1.25rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 1rem;
                    color: #fff;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    padding-bottom: 0.5rem;
                    display: inline-block;
                }
                .detail-block p {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #aaa;
                }
            `}</style>
        </section>
    );
};

export default AboutPage;
