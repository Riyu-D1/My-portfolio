import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Contact = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const linkRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                }
            });

            tl.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            })
                .from(linkRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                }, '-=0.8');

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" ref={containerRef} className="contact-section">
            <div className="contact-container">
                <h2 ref={titleRef} className="contact-title">Let's build something extraordinary.</h2>
                <div ref={linkRef} className="contact-links">
                    <a href="mailto:riyanshdiwan@gmail.com" className="contact-email">riyanshdiwan@gmail.com</a>
                    <div className="socials">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                    </div>
                </div>
            </div>

            <style>{`
        .contact-section {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          background: linear-gradient(to top, #000, transparent);
        }
        .contact-container {
          text-align: center;
          max-width: 800px;
        }
        .contact-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          line-height: 1.1;
          margin-bottom: 3rem;
          background: linear-gradient(to right, #fff, #888);
          -webkit-background-clip: text;
          color: transparent;
        }
        .contact-email {
          display: block;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          color: var(--primary-color);
          margin-bottom: 3rem;
          text-decoration: none;
          transition: opacity 0.3s;
        }
        .contact-email:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        .socials {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }
        .social-link {
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.6;
          transition: opacity 0.3s;
        }
        .social-link:hover {
          opacity: 1;
        }
      `}</style>
        </section>
    );
};

export default Contact;
