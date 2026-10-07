import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DeviceScene from '../scene/DeviceScene';
import Boot from '../components/Boot';
import InstrumentChrome from '../components/chrome/InstrumentChrome';
import AccentPicker from '../components/AccentPicker';
import HeroBeat from '../beats/HeroBeat';
import AboutBeat from '../beats/AboutBeat';
import ProjectsBeat from '../beats/ProjectsBeat';
import SkillsBeat from '../beats/SkillsBeat';
import ContactBeat from '../beats/ContactBeat';
import Marquee from '../components/Marquee';
import { rig } from '../scene/scrollRig';
import '../beats/beat.css';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------
   DIWAN — UNIT 01 · scroll cinema orchestrator

   One tall .scroll-track drives everything. A single master GSAP
   timeline (scrubbed) writes plain numbers into `rig` — the R3F loop
   reads them, zero React re-renders. Beat overlays are fixed layers
   crossfaded by the same timeline; per-beat ScrollTriggers toggle
   .is-live for inner stagger reveals + rig.mode/screen strings.
   ------------------------------------------------------------------ */

const TL_LEN = 6; // normalized timeline units

const SEGMENTS = {
  hero:        [0.0, 1.0],
  diagnostics: [1.0, 2.0],
  mod1:        [2.0, 2.67],
  mod2:        [2.67, 3.33],
  mod3:        [3.33, 4.0],
  telemetry:   [4.0, 5.0],
  transmit:    [5.0, 6.0],
};



const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Home = () => {
  const trackRef = useRef(null);
  const [booted, setBooted] = useState(
    () => sessionStorage.getItem('unitBooted') === '1' || reducedMotion()
  );

  // lock scroll during boot
  useEffect(() => {
    if (booted) return;
    const lenis = window.__unit?.lenis;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [booted]);

  const handleBootComplete = () => {
    sessionStorage.setItem('unitBooted', '1');
    setBooted(true);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion()) {
      // static mode: settled device, all beats stacked by CSS fallback
      Object.assign(rig, { px: 0, py: 0.35, pz: 7, rotY: 0.15, matMode: 1, glow: 1, mode: 'UNIT_01', screen: 'RD', progress: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // ---------- master scrubbed timeline ----------
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          onUpdate: (self) => { rig.progress = self.progress; },
        },
      });

      /* ----- camera journey (all rig numbers, no DOM) ----- */

      // HERO — slow push-in, screen boots RD → HELLO
      tl.to(rig, { pz: 6.6, duration: 1.0 }, 0);

      // DIAGNOSTICS — orbit left so device sits frame-right; material → solid
      tl.to(rig, {
        px: -2.6, py: 0.55, pz: 4.6, tx: -1.1, ty: 0.15,
        rotY: 0.7, matMode: 1, duration: 0.55,
      }, 1.0);

      // MODULES — three pushes; device drifts right, closes in, goes glass
      tl.to(rig, { px: -1.8, pz: 4.2, tx: -0.9, ty: 0.1, rotY: 0.45, duration: 0.5 }, 2.0);
      tl.to(rig, { px: -2.4, pz: 3.6, ty: 0.0, rotY: 0.55, matMode: 1.6, duration: 0.5 }, 2.67);
      tl.to(rig, { px: -1.5, pz: 4.0, tx: -0.8, ty: -0.1, rotY: 0.4, matMode: 2, duration: 0.5 }, 3.33);

      // TELEMETRY — pull back + slight top-down tilt
      tl.to(rig, {
        px: 0, py: 2.0, pz: 5.6, tx: 0, ty: -0.35,
        rotY: -0.5, matMode: 1, duration: 0.7,
      }, 4.0);

      // TRANSMIT — dolly toward the CRT, glow up
      tl.to(rig, {
        px: 0.8, py: 0.4, pz: 3.4, tx: 0.9, ty: 0.25,
        rotY: 0.08, glow: 1.8, duration: 0.8,
      }, 5.0);

      /* ----- beat overlay crossfades (same timeline) ----- */
      const beat = (sel, [a, b]) => {
        tl.fromTo(sel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: 'power2.out' }, a);
        tl.to(sel, { autoAlpha: 0, duration: 0.22, ease: 'power2.in' }, b - 0.05);
      };
      beat('.beat--hero', SEGMENTS.hero);
      beat('.beat--diagnostics', SEGMENTS.diagnostics);
      beat('.beat--modules', [SEGMENTS.mod1[0], SEGMENTS.mod3[1]]);
      beat('.beat--telemetry', SEGMENTS.telemetry);
      beat('.beat--transmit', [SEGMENTS.transmit[0], TL_LEN]);

      // module panels inside the modules beat
      const panel = (sel, [a, b]) => {
        tl.fromTo(sel, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, a + 0.04);
        tl.to(sel, { autoAlpha: 0, y: -18, duration: 0.18, ease: 'power2.in' }, b - 0.08);
      };
      panel('.mod-panel--1', SEGMENTS.mod1);
      panel('.mod-panel--2', SEGMENTS.mod2);
      panel('.mod-panel--3', SEGMENTS.mod3);

      // marquee strip lives inside the modules beat window
      tl.fromTo('.mq-fixed', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 1.95);
      tl.to('.mq-fixed', { autoAlpha: 0, duration: 0.15 }, 4.05);

      /* ----- per-segment triggers: .is-live + mode/screen strings -----
         Boundaries must use the SCROLLABLE distance (trackH − viewportH),
         which is what the master timeline's 'top top'→'bottom bottom'
         progress actually maps to — not raw track height. */
      const H = () => track.offsetHeight - window.innerHeight;
      const segTrigger = ([a, b], onToggle) =>
        ScrollTrigger.create({
          trigger: track,
          start: () => `top+=${H() * (a / TL_LEN)} top`,
          end: () => `top+=${H() * (b / TL_LEN)} top`,
          onToggle,
        });

      segTrigger(SEGMENTS.hero, (s) => {
        document.querySelector('.beat--hero')?.classList.toggle('is-live', s.isActive);
        if (s.isActive) { rig.mode = 'HERO'; }
      });
      // hero screen text flips RD → HELLO halfway through its segment
      segTrigger([0.45, 1.0], (s) => { if (s.isActive) rig.screen = 'HELLO'; });
      segTrigger([0.0, 0.45], (s) => { if (s.isActive) rig.screen = 'RD'; });

      segTrigger(SEGMENTS.diagnostics, (s) => {
        document.querySelector('.beat--diagnostics')?.classList.toggle('is-live', s.isActive);
        if (s.isActive) { rig.mode = 'DIAGNOSTICS'; rig.screen = 'DIAG'; }
      });
      [
        ['.mod-panel--1', SEGMENTS.mod1, '01'],
        ['.mod-panel--2', SEGMENTS.mod2, '02'],
        ['.mod-panel--3', SEGMENTS.mod3, '03'],
      ].forEach(([sel, seg, mode]) => {
        segTrigger(seg, (s) => {
          document.querySelector(sel)?.classList.toggle('is-live', s.isActive);
          if (s.isActive) { rig.mode = 'MODULES'; rig.screen = mode; }
        });
      });
      segTrigger(SEGMENTS.telemetry, (s) => {
        document.querySelector('.beat--telemetry')?.classList.toggle('is-live', s.isActive);
        if (s.isActive) { rig.mode = 'TELEMETRY'; rig.screen = 'STATS'; }
      });
      segTrigger(SEGMENTS.transmit, (s) => {
        document.querySelector('.beat--transmit')?.classList.toggle('is-live', s.isActive);
        if (s.isActive) { rig.mode = 'TRANSMIT'; rig.screen = 'TX'; }
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={trackRef} className="scroll-track" style={{ position: 'relative', height: '860vh' }}>
      {/* fixed WebGL scene */}
      <DeviceScene />

      {/* fixed beat overlays */}
      <div className="overlay-stack">
        <HeroBeat />
        <AboutBeat />
        <ProjectsBeat />
        <SkillsBeat />
        <ContactBeat />
        <div className="mq-fixed" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, opacity: 0, visibility: 'hidden' }}>
          <Marquee items={['MODULES', 'SMARTCV', 'STUDY FLOW', 'LAUNCH LAYER', 'SELECTED WORK', 'SCROLL']} />
        </div>
      </div>

      {/* fixed HUD */}
      <InstrumentChrome />

      {/* fixed accent rail */}
      <AccentPicker />

      {/* boot overlay */}
      {!booted && <Boot onComplete={handleBootComplete} />}
    </div>
  );
};

export default Home;
