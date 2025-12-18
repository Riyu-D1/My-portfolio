import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: "Nebula", category: "Web Design", color: "#7000ff" },
  { id: 2, title: "Quartz", category: "Development", color: "#00d4ff" },
  { id: 3, title: "Void", category: "Art Direction", color: "#ff0055" },
];

const Work = () => {
  const containerRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((el, index) => {
        gsap.fromTo(el,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  return (
    <section id="work" ref={containerRef} className="work-section section-padding">
      <div className="container">
        <h3 className="section-title">Selected Works</h3>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} ref={addToRefs} className="project-card">
              <div className="project-image" style={{ backgroundColor: project.color }}>
                {/* Placeholder for image */}
                <span className="project-placeholder-text">{project.title}</span>
              </div>
              <div className="project-info">
                <h4>{project.title}</h4>
                <p>{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .section-title {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4rem;
          opacity: 0.5;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 6rem;
        }
        .project-card {
          width: 100%;
        }
        .project-image {
          width: 100%;
          height: 60vh;
          background-color: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          transition: transform 0.5s ease;
          border-radius: 4px;
        }
        .project-card:hover .project-image {
          transform: scale(0.98);
        }
        .project-info h4 {
          font-size: 3rem;
          font-weight: 500;
        }
        .project-info p {
          font-size: 1.2rem;
          opacity: 0.6;
        }
        .project-placeholder-text {
          font-size: 2rem;
          opacity: 0.2;
          font-weight: 700;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
};

export default Work;
