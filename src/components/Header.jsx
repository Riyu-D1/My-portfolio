import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const navItems = [
  { label: 'overview', id: 'hero' },
  { label: 'about', id: 'about' },
  { label: 'contact', id: 'contact' },
];

const Header = () => {
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const buttonRefs = useRef([]);
  const displaceRef = useRef(null);
  const turbRef = useRef(null);
  const pillRef = useRef(null);
  const isClickNavigating = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    if (location.pathname === '/about') return 'about';
    if (location.pathname === '/contact') return 'contact';
    return 'hero';
  });
  const [highlightRect, setHighlightRect] = useState(() => {
    return { left: 0, top: 0, width: 0, height: 0, opacity: 0 };
  });

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Liquid Physics Animation
  useEffect(() => {
    if (!displaceRef.current || !turbRef.current) return;

    // 1. Continuous liquid breathing (idling state)
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(displaceRef.current, {
      attr: { scale: 22 },
      duration: 3,
      ease: "sine.inOut"
    }, 0);
    
    // Subtle turbulence shift to mimic flowing water
    const turbAnim = gsap.to(turbRef.current, {
      attr: { baseFrequency: 0.05 },
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 2. Real-time physics interaction on mouse move
    const onMouseMove = (e) => {
      if (!pillRef.current || !displaceRef.current) return;
      const rect = pillRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      
      // Affect the liquid if mouse is within 250px of the center of the nav pill
      if (distance < 250) {
        // Calculate physics intensity based on proximity
        const intensity = 1 - (distance / 250);
        gsap.to(displaceRef.current, {
          attr: { scale: 15 + (intensity * 40) }, // Spike the refraction hard
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        // Snap back to flowing liquid state with a physical spring bounce
        gsap.to(displaceRef.current, {
          attr: { scale: 15 },
          duration: 1.2,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto"
        });
      }
    };
    
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      tl.kill();
      turbAnim.kill();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isClickNavigating.current) return;
    
    if (location.pathname === '/about') {
      setActiveSection('about');
    } else if (location.pathname === '/contact') {
      setActiveSection('contact');
    } else if (location.pathname === '/') {
      // Re-trigger scroll spy to accurately position pill upon organic navigation (e.g. back button)
      setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
      }, 100);
    }
  }, [location.pathname]);

  // ScrollSpy to update active section based on scroll position on the home page
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleSpy = () => {
      if (isClickNavigating.current) return;

      // Also set contact if we hit the very absolute bottom of the page
      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      const contactEl = document.getElementById('contact');
      const aboutEl = document.getElementById('about');
      
      // Check from bottom to top, giving more forgiving threshold
      if (contactEl && contactEl.getBoundingClientRect().top <= window.innerHeight * 0.7) {
        setActiveSection('contact');
        return;
      }
      
      if (aboutEl && aboutEl.getBoundingClientRect().top <= window.innerHeight * 0.7) {
        setActiveSection('about');
        return;
      }
      
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleSpy, { passive: true });
    handleSpy();

    return () => window.removeEventListener('scroll', handleSpy);
  }, [location.pathname]);

  const updateHighlight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) {
      setHighlightRect((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const activeIndex = navItems.findIndex((item) => item.id === activeSection);
    const activeButton = buttonRefs.current[activeIndex];
    if (!activeButton) {
      setHighlightRect((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    setHighlightRect({
      left: activeButton.offsetLeft,
      top: activeButton.offsetTop,
      width: activeButton.offsetWidth,
      height: activeButton.offsetHeight,
      opacity: 1
    });
  }, [activeSection]);

  useLayoutEffect(() => {
    updateHighlight();
  }, [updateHighlight]);

  useEffect(() => {
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [updateHighlight]);

  const scrollToSection = (id) => {
    isClickNavigating.current = true;
    setActiveSection(id);
    
    // Free the scroll spy after smooth scroll finishes
    setTimeout(() => {
      isClickNavigating.current = false;
      window.dispatchEvent(new Event('scroll'));
    }, 1200);

    if (id === 'about') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      
      // Since Framer Motion (AnimatePresence) takes ~400ms-600ms to exit the old page, 
      // we need to wait for the new page and the target element to mount before scrolling.
      const checkAndScroll = (attempts = 0) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 30) { // Try for up to 1.5 seconds (30 * 50ms)
          setTimeout(() => checkAndScroll(attempts + 1), 50);
        } else if (id === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };
      
      checkAndScroll();
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header ref={headerRef} className={`inette-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="inette-header-inner">
        <button className="inette-logo" onClick={() => scrollToSection('hero')}>
          RD
        </button>

        <nav className="inette-nav" ref={navRef}>
          <div
            ref={pillRef}
            className="nav-highlight-liquid-glass"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              transform: `translate(${highlightRect.left}px, ${highlightRect.top}px)`,
              width: `${highlightRect.width}px`,
              height: `${highlightRect.height}px`,
              opacity: highlightRect.opacity,
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
              zIndex: 1,
              // Outer container ensures the shape is mathematically smooth and perfect
              borderRadius: '999px',
              overflow: 'hidden',
              boxShadow: `
                inset 0 2px 4px rgba(255, 255, 255, 0.6), 
                inset 0 -2px 6px rgba(0, 0, 0, 0.5),
                inset 4px 0 8px rgba(255,255,255,0.3),
                inset -4px 0 8px rgba(0,0,0,0.3),
                0 8px 30px rgba(0, 0, 0, 0.4)
              `,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderTopColor: 'rgba(255, 255, 255, 0.4)',
              borderLeftColor: 'rgba(255, 255, 255, 0.3)',
            }}
            aria-hidden
          >
            <div 
              style={{
                // Inner layer applies the backdrop filter and warps the background
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                right: '-15px',
                bottom: '-15px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.0) 100%)',
                // To distort what's BEHIND the glass, the SVG must be called inside backdropFilter
                backdropFilter: 'url(#liquid-distortion) blur(12px) contrast(120%) saturate(140%) brightness(1.1)',
                WebkitBackdropFilter: 'url(#liquid-distortion) blur(12px) contrast(120%) saturate(140%) brightness(1.1)',
              }}
            />
          </div>
          <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden>
            <filter id="liquid-distortion" x="-20%" y="-20%" width="140%" height="140%">
              {/* Higher frequency makes it look like thick imperfect glass refraction */}
              <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
              {/* x and y channels offset the pixels from the background */}
              <feDisplacementMap ref={displaceRef} in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>

          {navItems.map((item, index) => (
            <button
              type="button"
              key={item.id}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => scrollToSection(item.id)}
              className={`inette-nav-btn ${activeSection === item.id ? 'is-active' : ''}`}
              aria-pressed={activeSection === item.id}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <style>{`
        .inette-header {
          position: fixed;
          inset: 0 auto auto 0;
          right: 0;
          z-index: 1000;
          padding: 0 4rem;
          transition: background 0.4s ease, box-shadow 0.4s ease;
          background: linear-gradient(180deg, rgba(10, 10, 10, 0.45), rgba(10, 10, 10, 0.6));
          backdrop-filter: blur(22px);
        }

        .inette-header.scrolled {
          background: rgba(2, 2, 2, 0.95);
          box-shadow: 0 25px 45px rgba(0, 0, 0, 0.6);
        }

        .inette-header-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.75rem 0;
        }

        .inette-logo {
          background: none;
          border: none;
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: #f5f5f5;
          cursor: pointer;
          letter-spacing: 0.05em;
          font-weight: 400;
          padding: 0;
          transition: opacity 0.3s ease;
        }

        .inette-logo:hover {
          opacity: 0.75;
        }

        .inette-nav {
          position: relative;
          display: flex;
          gap: 1rem;
          padding: 0.55rem 0.75rem;
          border-radius: 999px;
          background: rgba(23, 23, 23, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.04);
        }

        /* Using the class from React Bits to style our specific instance */
        .nav-highlight-glass {
          z-index: 1;
        }

        .inette-nav-btn {
          position: relative;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1;
          font-family: var(--font-main);
          text-transform: lowercase;
          letter-spacing: 0.15em;
          font-size: 0.85rem;
          padding: 0.65rem 1.35rem;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.3s ease;
          z-index: 2;
        }

        .inette-nav-btn span {
          display: block;
        }

        .inette-nav-btn:hover {
          color: #ffffff;
        }

        .inette-nav-btn.is-active {
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .inette-header {
            padding: 0 1.5rem;
          }

          .inette-header-inner {
            padding: 1.25rem 0;
          }

          .inette-nav {
            gap: 0.5rem;
            padding: 0.45rem 0.5rem;
          }

          .inette-nav-btn {
            padding: 0.6rem 1rem;
            font-size: 0.78rem;
            letter-spacing: 0.1em;
          }
        }

        @media (max-width: 480px) {
          .inette-header {
            padding: 0 1rem;
          }

          .inette-nav {
            gap: 0.35rem;
            padding: 0.4rem 0.35rem;
          }

          .inette-nav-btn {
            padding: 0.55rem 0.85rem;
            font-size: 0.72rem;
            letter-spacing: 0.08em;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
