import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import GlassSurface from './GlassSurface';

const Header = () => {
  const headerRef = useRef(null);
  const lightRef = useRef(null);
  const dropletRef = useRef(null);
  const navRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Reveal header
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 }
    );

    moveDroplet(0, true);

    const handleMouseMove = (e) => {
      if (!headerRef.current || !lightRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(lightRef.current, {
        attr: { x: x, y: y, z: 80 },
        duration: 0.2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const moveDroplet = (index, immediate = false) => {
    if (!navRef.current || !dropletRef.current) return;

    const navItems = navRef.current.querySelectorAll('.nav-btn');
    const target = navItems[index];
    if (!target) return;

    const navRect = navRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const left = targetRect.left - navRect.left;
    const width = targetRect.width;

    const currentLeft = dropletRef.current.offsetLeft;
    const dist = left - currentLeft;

    const stretch = Math.max(0.8, Math.min(1.4, 1 + Math.abs(dist) / 400));

    const tl = gsap.timeline();

    if (immediate) {
      gsap.set(dropletRef.current, { left, width });
    } else {
      tl.to(dropletRef.current, {
        scaleX: stretch,
        scaleY: 1 / stretch,
        duration: 0.2,
        ease: "power2.in"
      })
        .to(dropletRef.current, {
          left: left,
          width: width,
          duration: 0.5,
          ease: "elastic.out(1, 0.6)"
        }, 0)
        .to(dropletRef.current, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.4)"
        }, 0.1);
    }
  };

  const handleNavLeave = () => {
    moveDroplet(activeIndex);
  };

  const scrollToSection = (id, index) => {
    setActiveIndex(index);
    moveDroplet(index);

    if (id === 'about') {
      navigate('/about');
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header ref={headerRef} className="lg-header-container">
      <GlassSurface
        width="fit-content"
        height="auto"
        borderRadius={40}
        opacity={0.5}
        blur={10}
        saturation={1.2}
        backgroundOpacity={0}
        distortionScale={20}
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.15), 0 0 20px rgba(255, 255, 255, 0.05), 0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        <nav
          ref={navRef}
          className="glass-content"
          onMouseLeave={handleNavLeave}
        >
          <div ref={dropletRef} className="nav-droplet"></div>

          {['Hero', 'About', 'Work', 'Contact'].map((label, i) => (
            <button
              key={label}
              onClick={() => scrollToSection(label.toLowerCase(), i)}
              className={`nav-btn ${activeIndex === i ? 'active' : ''}`}
              onMouseEnter={() => moveDroplet(i)}
            >
              {label}
            </button>
          ))}
        </nav>
      </GlassSurface>

      <style>{`
           :root {
              --lg-text: #ffffff;
            }

           .lg-header-container {
             position: fixed;
             top: 2rem;
             left: 50%;
             transform: translateX(-50%);
             z-index: 1000;
             width: fit-content;
             min-width: 340px;
           }

           .glass-content {
              position: relative;
              z-index: 3;
              display: flex;
              align-items: center;
              justify-content: space-around;
              padding: 8px 12px;
              gap: 0.5rem;
           }

           .nav-btn {
              position: relative;
              z-index: 2;
              background: none;
              border: none;
              color: rgba(255,255,255,0.6);
              font-family: var(--font-main);
              font-weight: 500;
              font-size: 0.95rem;
              cursor: pointer;
              padding: 0.75rem 1.5rem;
              transition: color 0.3s;
           }
           
           .nav-btn:hover, .nav-btn.active {
              color: #fff;
              text-shadow: 0 0 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.3);
           }

           .nav-droplet {
              position: absolute;
              height: 80%;
              top: 10%;
              border-radius: 99px;
              background: rgba(255, 255, 255, 0.15);
              box-shadow: 
                0 0 15px rgba(255,255,255,0.1),
                inset 0 0 10px rgba(255,255,255,0.1);
              z-index: 0;
              pointer-events: none;
           }
         `}</style>
    </header>
  );
};

export default Header;
