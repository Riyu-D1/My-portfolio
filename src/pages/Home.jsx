import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import FeaturedProjects from '../components/FeaturedProjects';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import LoadingScreen from '../components/LoadingScreen';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if user has seen loading screen in this session
        const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
        
        if (!hasSeenLoading) {
            setIsLoading(true);
        }
    }, []);

    const handleLoadComplete = () => {
        setIsLoading(false);
        // Mark that user has seen the loading screen in this session
        sessionStorage.setItem('hasSeenLoading', 'true');
    };

    return (
        <>
            {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
            <Hero />
            <About />
            <Services />
            <FeaturedProjects />
            <Testimonials />
            <FAQ />
            <ContactForm />
        </>
    );
};

export default Home;
