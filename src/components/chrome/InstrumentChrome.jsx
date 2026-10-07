// ============================================================
// InstrumentChrome — fixed HUD frame for DIWAN — UNIT 01.
// Pure DOM overlay (z 30) above .overlay-stack (z 20). Never
// intercepts pointer events; all live readouts are written by
// one rAF loop straight into textContent / classList — React
// state would thrash since rig mutates ~60×/sec.
// ============================================================
import { useEffect, useRef } from 'react';
import { rig } from '../../scene/scrollRig';

const SEGMENTS = 20;

export default function InstrumentChrome() {
  const modeRef = useRef(null);   // MODE readout (top-right)
  const pctRef = useRef(null);    // percent readout (bottom-right)
  const segsRef = useRef(null);   // segment column (left edge)
  const recRef = useRef(null);    // ● REC indicator (TRANSMIT only)

  useEffect(() => {
    let raf = 0;
    const segs = segsRef.current ? segsRef.current.children : [];

    const tick = () => {
      const mode = rig.mode;
      const p = Math.min(1, Math.max(0, rig.progress));

      // MODE readout — write only when it changes
      if (modeRef.current && modeRef.current.textContent !== mode) {
        modeRef.current.textContent = mode;
      }

      // left-edge segment meter — integer steps, percussive flip
      const filled = Math.round(p * SEGMENTS);
      for (let i = 0; i < segs.length; i++) {
        segs[i].classList.toggle('on', i < filled);
      }

      // percent readout — "000%" .. "100%"
      const pct = String(Math.round(p * 100)).padStart(3, '0') + '%';
      if (pctRef.current && pctRef.current.textContent !== pct) {
        pctRef.current.textContent = pct;
      }

      // ● REC — TRANSMIT interrupt red only
      if (recRef.current) {
        recRef.current.classList.toggle('on', mode === 'TRANSMIT');
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="unit-chrome" aria-hidden="true">
      <style>{CHROME_CSS}</style>

      {/* corner registration marks */}
      <i className="unit-chrome__corner unit-chrome__corner--tl" />
      <i className="unit-chrome__corner unit-chrome__corner--tr" />
      <i className="unit-chrome__corner unit-chrome__corner--bl" />
      <i className="unit-chrome__corner unit-chrome__corner--br" />

      {/* top-left cluster */}
      <div className="unit-chrome__cluster unit-chrome__cluster--tl">
        <span className="mono-label mono-label--bright">RD—UNIT_01</span>
        <span className="mono-label mono-label--dim">SYS.OK</span>
      </div>

      {/* top-right cluster — live mode readout */}
      <div className="unit-chrome__cluster unit-chrome__cluster--tr">
        <span className="mono-label mono-label--dim">MODE</span>
        <span className="unit-chrome__readout" ref={modeRef}>BOOT</span>
      </div>

      {/* left-edge segment meter */}
      <div className="unit-chrome__segs" ref={segsRef}>
        {Array.from({ length: SEGMENTS }, (_, i) => <i key={i} />)}
      </div>

      {/* bottom-left cluster — static coords */}
      <div className="unit-chrome__cluster unit-chrome__cluster--bl">
        <span className="mono-label mono-label--dim">51.50°N 0.12°W</span>
        <span className="mono-label mono-label--dim">· OLED/MONO</span>
      </div>

      {/* bottom-right cluster — REC over percent */}
      <div className="unit-chrome__cluster unit-chrome__cluster--br">
        <div className="unit-chrome__rec" ref={recRef}>
          <i className="unit-chrome__rec-dot" />
          <span className="mono-label">REC</span>
        </div>
        <div className="unit-chrome__pct">
          <span className="unit-chrome__readout" ref={pctRef}>000%</span>
          <span className="mono-label mono-label--dim">SCROLL</span>
        </div>
      </div>
    </div>
  );
}

// Scoped chrome styles — all selectors prefixed .unit-chrome
const CHROME_CSS = `
.unit-chrome {
  position: fixed;
  inset: 0;
  z-index: 30;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
}

/* ---- corner registration marks ---- */
.unit-chrome__corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 0 solid var(--border-visible);
}
.unit-chrome__corner--tl { top: 14px; left: 14px; border-top-width: 1px; border-left-width: 1px; }
.unit-chrome__corner--tr { top: 14px; right: 14px; border-top-width: 1px; border-right-width: 1px; }
.unit-chrome__corner--bl { bottom: 14px; left: 14px; border-bottom-width: 1px; border-left-width: 1px; }
.unit-chrome__corner--br { bottom: 14px; right: 14px; border-bottom-width: 1px; border-right-width: 1px; }

/* ---- text clusters (registered inside the corner marks) ---- */
.unit-chrome__cluster {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.unit-chrome__cluster--tl { top: 36px; left: 36px; align-items: flex-start; }
.unit-chrome__cluster--tr { top: 36px; right: 36px; align-items: flex-end; text-align: right; }
.unit-chrome__cluster--bl { bottom: 36px; left: 36px; flex-direction: row; align-items: baseline; gap: 8px; }
.unit-chrome__cluster--br { bottom: 36px; right: 36px; align-items: flex-end; text-align: right; gap: 9px; }

.unit-chrome__readout {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-primary);
}

/* ---- left-edge segment meter ---- */
.unit-chrome__segs {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.unit-chrome__segs i {
  display: block;
  width: 3px;
  height: 10px;
  background: var(--border-visible);
}
.unit-chrome__segs i.on { background: var(--text-primary); }

/* ---- ● REC — TRANSMIT-only interrupt red ---- */
.unit-chrome__rec {
  display: flex;
  align-items: center;
  gap: 7px;
  opacity: 0;
  transition: opacity var(--dur-micro) var(--ease-out);
}
.unit-chrome__rec.on { opacity: 1; }
.unit-chrome__rec-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  animation: unit-chrome-rec-pulse 1.2s ease-in-out infinite;
}
@keyframes unit-chrome-rec-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

/* ---- percent + SCROLL row ---- */
.unit-chrome__pct {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
`;
