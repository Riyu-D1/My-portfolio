import { useEffect, useRef, useState } from 'react';
import profileImg from '../assets/profile.png';
import memojiImg from '../assets/memoji.png';
import './FlippingCard.css';

const FlippingCard = () => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [stopPosition, setStopPosition] = useState(0);
    const boundsRef = useRef({ start: 0, end: 1, stopY: 0 });

    // Preload both images with smooth fade-in
    useEffect(() => {
        const frontImg = new Image();
        const backImg = new Image();
        let loaded = 0;
        
        const onLoad = () => {
            loaded++;
            if (loaded >= 1) {
                // Add a small delay to sync with page transition
                setTimeout(() => setIsReady(true), 300);
            }
        };
        
        const onError = () => {
            loaded++;
            if (loaded >= 1) {
                setTimeout(() => setIsReady(true), 300);
            }
        };
        
        frontImg.onload = onLoad;
        frontImg.onerror = onError;
        backImg.onload = onLoad;
        backImg.onerror = onError;
        frontImg.src = profileImg;
        backImg.src = memojiImg;
    }, []);

    // Calculate scroll bounds
    useEffect(() => {
        const calculateBounds = () => {
            const aboutSection = document.querySelector('#about');
            if (!aboutSection) return;

            const aboutTop = aboutSection.offsetTop;
            const viewportCenter = window.innerHeight / 2;
            const cardHalfHeight = 225; // half of 450px
            
            // Stop aligned with ABOUT ME title - push much further down
            const extraScroll = 450; // pixels further down before stopping
            const stopScrollY = aboutTop - viewportCenter + extraScroll;
            
            // Absolute position on the page where card should stop
            const absoluteStopTop = aboutTop - cardHalfHeight + extraScroll;

            boundsRef.current = {
                start: 0,
                end: stopScrollY,
                stopY: stopScrollY
            };
            
            setStopPosition(absoluteStopTop);
        };

        calculateBounds();
        window.addEventListener('resize', calculateBounds);
        setTimeout(calculateBounds, 200);

        return () => window.removeEventListener('resize', calculateBounds);
    }, []);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            const { start, end, stopY } = boundsRef.current;
            const scrollY = window.scrollY;
            const range = end - start;

            if (range <= 0) return;

            // Calculate rotation progress (0 to 1, clamped)
            let progress = (scrollY - start) / range;
            progress = Math.max(0, Math.min(1, progress));
            setRotation(progress * 180);

            // Switch to absolute positioning when we reach the stop point
            if (scrollY >= stopY) {
                setIsStopped(true);
            } else {
                setIsStopped(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div 
            className={`flipping-card-container ${isStopped ? 'stopped' : ''}`}
            style={{ 
                opacity: isReady ? 1 : 0,
                ...(isStopped && { top: `${stopPosition}px` })
            }}
        >
            <div 
                ref={cardRef} 
                className="flipping-card"
                style={{ transform: `rotateY(${rotation}deg)` }}
            >
                <div className="card-side card-front">
                    <img src={profileImg} alt="Riyansh Diwan" />
                </div>
                <div className="card-side card-back">
                    <img src={memojiImg} alt="Memoji" />
                </div>
            </div>
        </div>
    );
};

export default FlippingCard;
