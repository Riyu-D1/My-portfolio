import { useState, useEffect } from 'react';
import './LoadingScreen.css';
import DecryptedText from './DecryptedText';

const LoadingScreen = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const duration = 3500;
        const interval = 20;
        const steps = duration / interval;
        const increment = 100 / steps;

        let currentProgress = 0;
        const timer = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(timer);
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(() => {
                        onLoadComplete();
                    }, 500);
                }, 300);
            }
            setProgress(Math.round(currentProgress));
        }, interval);

        return () => clearInterval(timer);
    }, [onLoadComplete]);

    return (
        <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
            <div className="loading-content">
                <div className="loading-logo">
                    <span className="loading-name">RiyanshDiwan</span>
                    <div className="loading-tagline">
                        <DecryptedText
                            text="Booting up creativity.exe"
                            speed={40}
                            maxIterations={15}
                            sequential={true}
                            revealDirection="start"
                            characters="01"
                            animateOn="view"
                            className="revealed-char"
                            encryptedClassName="encrypted-char"
                        />
                    </div>
                </div>
                <div className="loading-bar-container">
                    <div className="loading-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="loading-info">
                    <span className="loading-text">{ 'LOADING' }</span>
                    <span className="loading-percent">{progress}%</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
