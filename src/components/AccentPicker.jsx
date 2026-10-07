// AccentPicker — the unit's HUE module. Fixed right-edge rail of
// accent swatches; clicking one sweeps --accent through every DOM
// consumer (GSAP var tween), lerps the 3D accent parts via rig, and
// re-tints the CRT phosphor — plus a scanline wipe for the switch.

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { rig, ACCENTS, setAccent } from '../scene/scrollRig';

export default function AccentPicker() {
  const [active, setActive] = useState(rig.accent);
  const scanRef = useRef(null);

  // apply persisted accent on mount — set, not tweened
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', rig.accent);
  }, []);

  const pick = (e, hex) => {
    if (hex === rig.accent) return;
    setAccent(hex); // rig + localStorage — 3D parts lerp toward it
    setActive(hex);

    // sweep every var(--accent) consumer — dots, readouts, buttons
    gsap.to(document.documentElement, {
      '--accent': hex,
      duration: 0.45,
      ease: 'power2.out',
    });

    // percussive pop on the pressed swatch
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.72 },
      { scale: 1, duration: 0.32, ease: 'back.out(3.2)' }
    );

    // scanline wipe — a hairline in the new accent sweeps the viewport
    if (scanRef.current) {
      gsap.fromTo(
        scanRef.current,
        { top: '0%', opacity: 0.9, background: hex },
        { top: '100%', opacity: 0, duration: 0.55, ease: 'power2.in' }
      );
    }
  };

  return (
    <>
      {/* scanline wipe element — one per switch */}
      <i className="accent-scan" ref={scanRef} aria-hidden="true" />

      <div className="accent-rail" role="radiogroup" aria-label="Accent colour">
        <span className="accent-rail__label mono-label mono-label--dim">HUE</span>
        {ACCENTS.map((a) => (
          <button
            key={a.id}
            type="button"
            role="radio"
            aria-checked={active === a.hex}
            aria-label={`Accent ${a.label}`}
            className={`accent-swatch${active === a.hex ? ' is-on' : ''}`}
            onClick={(e) => pick(e, a.hex)}
          >
            <i className="accent-swatch__tick" aria-hidden="true" />
            <i className="accent-swatch__fill" style={{ background: a.hex }} aria-hidden="true" />
          </button>
        ))}
      </div>

      <style>{`
        .accent-rail {
          position: fixed;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 35;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .accent-rail__label {
          writing-mode: vertical-rl;
          letter-spacing: 0.3em;
          font-size: 8px;
          margin-bottom: 2px;
        }
        .accent-swatch {
          position: relative;
          width: 16px;
          height: 16px;
          padding: 0;
          border: 1px solid var(--border-visible);
          background: transparent;
          cursor: pointer;
          pointer-events: auto;
          display: grid;
          place-items: center;
        }
        .accent-swatch__fill {
          width: 8px;
          height: 8px;
          opacity: 0.35;
          transition: opacity var(--dur-micro) var(--ease-out);
        }
        .accent-swatch:hover .accent-swatch__fill { opacity: 0.7; }
        .accent-swatch.is-on .accent-swatch__fill { opacity: 1; }
        /* selection tick — sits left of the active swatch */
        .accent-swatch__tick {
          position: absolute;
          left: -8px;
          top: 50%;
          width: 3px;
          height: 10px;
          transform: translateY(-50%) scaleY(0);
          background: var(--text-primary);
          transition: transform var(--dur-micro) var(--ease-out);
        }
        .accent-swatch.is-on .accent-swatch__tick { transform: translateY(-50%) scaleY(1); }

        .accent-scan {
          position: fixed;
          left: 0;
          right: 0;
          height: 1px;
          z-index: 60;
          pointer-events: none;
          opacity: 0;
        }

        @media (max-width: 560px) {
          .accent-rail { right: 8px; gap: 8px; }
          .accent-rail__label { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .accent-swatch__fill,
          .accent-swatch__tick { transition: none; }
        }
      `}</style>
    </>
  );
}
