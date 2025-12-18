import { useRef } from 'react';
import GradientBlinds from './GradientBlinds';
import TiltedCard from './TiltedCard';
import profileImg from '../assets/profile.png';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            <div className="hero-background">
                <GradientBlinds
                    gradientColors={['#111111', '#1a1a1a', '#000000']}
                    angle={135}
                    noise={0.4}
                    blindCount={16}
                    blindMinWidth={60}
                    spotlightRadius={0.5}
                    spotlightSoftness={1}
                    spotlightOpacity={1}
                    mouseDampening={0.15}
                    distortAmount={2}
                    shineDirection="left"
                    mixBlendMode="lighten"
                />
            </div>

            <div className="hero-container">
                <div className="hero-top-name">RIYANSH DIWAN</div>

                <div className="hero-content-wrapper">
                    <h1 className="hero-large-text top-left">VISIONARY</h1>

                    <div className="hero-card-wrapper">
                        {/* Card is now handled by FlippingCard component */}
                    </div>

                    <div className="hero-bottom-right">
                        <h1 className="hero-large-text bottom-right">DESIGNER</h1>
                        <p className="hero-description">
                            Young entrepreneur passionate about shaping the future through tech and AI.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
