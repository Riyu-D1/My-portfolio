import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import memojiImg from '../assets/memoji.png';

const specs = [
    { k: 'ROLE', v: 'CREATIVE ENGINEER' },
    { k: 'BASE', v: 'LONDON' },
    { k: 'FOCUS', v: 'WEB / AI / EMBEDDED' },
    { k: 'STACK', v: 'TS · REACT · PYTHON · KICAD' },
    { k: 'HOBBY', v: 'PHOTOGRAPHY / 3D PRINT' },
];

const systemLog = [
    { k: '[2023]', v: 'FIRST BUILD — WEB EXPERIMENTS' },
    { k: '[2024]', v: 'AI PLATFORMS — SMARTCV, STUDY FLOW' },
    { k: '[2024]', v: 'LAUNCH LAYER — CLIENT WORK' },
    { k: '[2025]', v: 'UNIT_01 — THIS SITE' },
    { k: '[NOW]', v: 'EXPLORING — AGENTS + HARDWARE' },
];

const AboutPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }

        const ctx = gsap.context(() => {
            gsap.from('.a-in', {
                y: 24,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.05,
                delay: 0.1,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="about-doc">
            <div className="about-watermark doto" aria-hidden="true">RD</div>

            <header className="about-head">
                <p className="mono-label a-in">// SPEC SHEET</p>
                <h1 className="doto about-title a-in">ABOUT</h1>
                <div className="about-id a-in">
                    <p className="about-name">RIYANSH DIWAN</p>
                    <p className="mono-label mono-label--dim about-status">
                        <span className="sig-dot" aria-hidden="true" />
                        STATUS — ALL SYSTEMS NOMINAL
                    </p>
                </div>
            </header>

            <section className="about-mid">
                <p className="about-bio a-in">
                    I'm a young entrepreneur and creative engineer exploring the
                    edges of AI, design, and digital tools — building smart,
                    purposeful products that solve real problems. I push ideas
                    into the physical world too, prototyping with hardware and
                    3D printing. Off-screen, photography is my outlet: same
                    obsession with light and detail, different instrument.
                </p>

                <figure className="about-figure frame-line a-in">
                    <img src={memojiImg} alt="Riyansh Diwan — memoji portrait" />
                    <figcaption className="corner-tag">FIG.01 — OPERATOR</figcaption>
                </figure>
            </section>

            <section className="about-block" aria-label="Unit specification">
                {specs.map((row) => (
                    <div className="spec-row a-in" key={row.v}>
                        <span className="k">{row.k}</span>
                        <span className="v">{row.v}</span>
                    </div>
                ))}
            </section>

            <section className="about-block" aria-label="System log">
                <p className="mono-label about-log-label a-in">// SYSTEM LOG</p>
                {systemLog.map((row) => (
                    <div className="spec-row a-in" key={row.v}>
                        <span className="k">{row.k}</span>
                        <span className="v">{row.v}</span>
                    </div>
                ))}
            </section>

            <style>{`
                .about-doc {
                    position: relative;
                    max-width: 880px;
                    margin: 0 auto;
                    padding: 120px var(--pad) 160px;
                    font-family: var(--font-body);
                }

                /* faint dot-matrix watermark — bleeds off the left edge */
                .about-watermark {
                    position: absolute;
                    top: 40px;
                    left: -0.06em;
                    font-size: clamp(180px, 34vw, 420px);
                    font-weight: 700;
                    line-height: 0.8;
                    opacity: 0.05;
                    pointer-events: none;
                    user-select: none;
                    z-index: 0;
                }

                .about-head,
                .about-mid,
                .about-block {
                    position: relative;
                    z-index: 1;
                }

                .about-title {
                    font-size: clamp(64px, 14vw, 140px);
                    margin-top: 1rem;
                }

                .about-id {
                    margin-top: clamp(1.25rem, 3vw, 2rem);
                }

                .about-name {
                    font-weight: 500;
                    font-size: clamp(18px, 2.5vw, 24px);
                    color: var(--text-primary);
                    letter-spacing: 0.02em;
                }

                .about-status {
                    display: flex;
                    align-items: center;
                    margin-top: 12px;
                }

                .sig-dot {
                    display: inline-block;
                    flex: none;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--accent);
                    margin-right: 10px;
                }

                .about-mid {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 220px;
                    gap: clamp(2.5rem, 7vw, 5rem);
                    align-items: start;
                    margin-top: clamp(3rem, 8vw, 5rem);
                }

                .about-bio {
                    font-size: 17px;
                    line-height: 1.7;
                    color: var(--text-primary);
                    max-width: 58ch;
                }

                .about-figure {
                    width: 100%;
                    max-width: 220px;
                    justify-self: end;
                    border-radius: 6px;
                    overflow: hidden;
                    background: var(--surface-raised);
                }

                .about-figure img {
                    width: 100%;
                    aspect-ratio: 1;
                    object-fit: cover;
                    filter: grayscale(1) contrast(1.05);
                }

                .about-figure figcaption {
                    padding: 8px 10px;
                    border-top: 1px solid var(--border);
                }

                .about-block {
                    margin-top: clamp(3rem, 8vw, 5rem);
                }

                .about-block .spec-row:last-child {
                    border-bottom: 1px solid var(--border);
                }

                .about-log-label {
                    margin-bottom: 16px;
                }

                @media (max-width: 640px) {
                    .about-mid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 480px) {
                    .about-doc {
                        padding-top: 96px;
                        padding-bottom: 120px;
                    }

                    .about-watermark {
                        font-size: clamp(140px, 48vw, 220px);
                    }

                    .about-doc .spec-row {
                        flex-direction: column;
                        gap: 4px;
                    }

                    .about-doc .spec-row .v {
                        text-align: left;
                    }
                }
            `}</style>
        </main>
    );
};

export default AboutPage;
