import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
    {
        question: "WHAT SERVICES DO YOU OFFER?",
        answer: "I offer a range of services including UI/UX design, web development, AI-powered application development, and 3D printing/hardware prototyping. Each project is tailored to meet your specific needs and goals."
    },
    {
        question: "HOW DOES THE DESIGN PROCESS WORK?",
        answer: "My process typically starts with understanding your goals and requirements. From there, I create wireframes and prototypes, iterate based on your feedback, and then move to final development. Communication is key throughout the entire process."
    },
    {
        question: "HOW LONG DOES A PROJECT USUALLY TAKE?",
        answer: "Project timelines vary depending on scope and complexity. A simple landing page might take 1-2 weeks, while a full web application could take 4-8 weeks. I'll provide a detailed timeline during our initial consultation."
    },
    {
        question: "WHAT DO I NEED TO PROVIDE BEFORE STARTING A PROJECT?",
        answer: "To get started, I typically need a clear project brief, any existing brand assets (logos, colors, fonts), content for the website, and examples of designs you like. The more information you provide, the better I can serve your needs."
    },
    {
        question: "DO YOU OFFER REVISIONS?",
        answer: "Yes! I include revision rounds in all my projects to ensure you're completely satisfied with the final result. The number of revisions depends on the project scope and is discussed upfront."
    },
    {
        question: "HOW DO I GET STARTED?",
        answer: "Simply reach out through the contact form on this page or send me an email. I'll schedule a discovery call to discuss your project, understand your needs, and provide a custom quote."
    }
];

const FAQ = () => {
    const sectionRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.faq-title', {
                scrollTrigger: {
                    trigger: '.faq-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.faq-item', {
                scrollTrigger: {
                    trigger: '.faq-list',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={sectionRef} className="faq-section">
            <div className="faq-container">
                <h2 className="faq-title">FREQUENTLY ASKED QUESTIONS</h2>
                <p className="faq-subtitle">
                    Here are answers to some of the most common questions I receive. 
                    If you don't see your question here, feel free to reach out—I'm happy to help!
                </p>

                <div className="faq-list">
                    {faqData.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`faq-item ${openIndex === index ? 'open' : ''}`}
                        >
                            <button 
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="faq-number">{index + 1}.</span>
                                <span className="faq-question-text">{faq.question}</span>
                                <span className="faq-icon">
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
