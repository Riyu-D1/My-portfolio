import { useEffect, useRef, useState } from 'react';

/* ============================================================
   BOOT — "DIWAN — UNIT 01" power-on sequence
   Feel: a device powering on — percussive, mechanical.
   ~2.2s of sequence + 300ms fade-out, then onComplete() once
   (the parent owns unmount + session-once logic).
   Tap anywhere to skip → jumps to end state → fades → done.
   ============================================================ */

const LOG_LINES = [
  '> PWR.OK',
  '> GLYPHS ..... LOADED',
  '> RENDERER .... WEBGL2',
  '> SENSORS ..... CALIBRATED',
  '> DISPLAY ..... OLED/MONO',
];

const TITLE = 'DIWAN — UNIT_01';
const SEG_COUNT = 24;
const SEG_CHUNK = 4; /* segments per step — chunky steps, not a smooth fill */

/* sequence timeline (ms) */
const T_LINE_0 = 90;    /* first log line lands */
const T_LINE_STEP = 180; /* between log lines */
const T_SEG_0 = 960;    /* bar starts filling */
const T_SEG_STEP = 110; /* per chunk of 4 */
const T_TITLE = 1540;   /* wordmark begins resolving */
const T_FADE = 2260;    /* ~330ms hold after resolve → fade */
const T_DONE = 2620;    /* fade (300ms) + buffer → onComplete */
const FADE_MS = 300;
const CH_STAGGER = 15;  /* per-letter resolve stagger */

const STYLES = `
.unit-boot {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--black);
  pointer-events: auto;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  opacity: 1;
  transition: opacity ${FADE_MS}ms var(--ease-out);
}
.unit-boot.is-out {
  opacity: 0;
  pointer-events: none;
}

/* power-on phosphor blip — one percussive flash at t=0 */
.unit-boot .unit-boot-flash {
  position: absolute;
  inset: 0;
  background: var(--text-display);
  opacity: 0;
  pointer-events: none;
  animation: unit-boot-flash 150ms var(--ease-out) both;
}
@keyframes unit-boot-flash {
  from { opacity: 0.12; }
  to   { opacity: 0; }
}

/* left column ~32% from left, vertically centered-ish */
.unit-boot .unit-boot-stage {
  position: absolute;
  left: 32vw;
  top: 50%;
  transform: translateY(-54%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* mono log lines — instant on (visibility, no transition = percussive) */
.unit-boot .unit-boot-log {
  display: flex;
  flex-direction: column;
}
.unit-boot .unit-boot-line {
  height: 19px;
  line-height: 19px;
  visibility: hidden;
  white-space: nowrap;
}
.unit-boot .unit-boot-line.on {
  visibility: visible;
}

/* blinking block cursor on the most recent log line */
.unit-boot .unit-boot-cursor {
  display: inline-block;
  width: 7px;
  height: 11px;
  margin-left: 8px;
  vertical-align: -1px;
  background: var(--text-secondary);
  animation: unit-boot-blink 0.72s step-end infinite;
}
@keyframes unit-boot-blink {
  50% { opacity: 0; }
}

/* segmented progress bar (existing .seg-bar/.seg utility) */
.unit-boot .unit-boot-bar {
  width: min(300px, 54vw);
  margin-top: 30px;
}

/* dot-matrix wordmark — per-letter resolve, ease-out only */
.unit-boot .unit-boot-title {
  margin-top: 38px;
  font-size: clamp(40px, 7.6vw, 72px);
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
}
.unit-boot .unit-boot-ch {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.16em);
  transition:
    opacity 180ms var(--ease-out),
    transform 220ms var(--ease-out);
}
.unit-boot .unit-boot-ch.on {
  opacity: 1;
  transform: translateY(0);
}

/* instrument chrome */
.unit-boot .unit-boot-tl {
  position: absolute;
  left: var(--pad);
  top: calc(var(--pad) * 0.85);
}
.unit-boot .unit-boot-skip {
  position: absolute;
  right: var(--pad);
  bottom: calc(var(--pad) * 0.85);
  pointer-events: none; /* label only — the root overlay takes the click */
}
.unit-boot .unit-boot-skip::after {
  content: '_';
  animation: unit-boot-blink 1s step-end infinite;
}

@media (max-width: 640px) {
  .unit-boot .unit-boot-stage {
    left: var(--pad);
    right: var(--pad);
  }
  .unit-boot .unit-boot-title {
    font-size: clamp(32px, 10vw, 44px);
    letter-spacing: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .unit-boot .unit-boot-flash,
  .unit-boot .unit-boot-cursor,
  .unit-boot .unit-boot-skip::after {
    animation: none;
  }
}
`;

export default function Boot({ onComplete }) {
  const [lines, setLines] = useState(0);       /* count of visible log lines */
  const [segs, setSegs] = useState(0);         /* count of lit segments */
  const [titleOn, setTitleOn] = useState(false);
  const [instant, setInstant] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ); /* skip/reduced: no staggers */
  const [fading, setFading] = useState(false);

  const timersRef = useRef([]);
  const doneRef = useRef(false);
  const fadingRef = useRef(false);
  const skipRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    const timers = timersRef.current;
    const later = (fn, ms) => { timers.push(setTimeout(fn, ms)); };
    const clearAll = () => { timers.forEach(clearTimeout); timers.length = 0; };

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      if (onCompleteRef.current) onCompleteRef.current();
    };
    const endState = () => {
      setLines(LOG_LINES.length);
      setSegs(SEG_COUNT);
      setTitleOn(true);
    };
    const startFade = () => {
      if (fadingRef.current) return;
      fadingRef.current = true;
      setFading(true);
    };

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      /* no theatrics — static end frame, brief hold, out */
      endState();
      later(startFade, 380);
      later(finish, 380 + FADE_MS + 40);
    } else {
      /* 1 · log lines blink on, one every 180ms */
      LOG_LINES.forEach((_, i) => {
        later(() => setLines(i + 1), T_LINE_0 + i * T_LINE_STEP);
      });
      /* 2 · seg-bar fills L→R in mechanical chunks of 4 */
      const steps = SEG_COUNT / SEG_CHUNK;
      for (let s = 1; s <= steps; s += 1) {
        later(() => setSegs(s * SEG_CHUNK), T_SEG_0 + (s - 1) * T_SEG_STEP);
      }
      /* 3 · wordmark resolves · 4 · hold → fade → onComplete */
      later(() => setTitleOn(true), T_TITLE);
      later(startFade, T_FADE);
      later(finish, T_DONE);
    }

    /* tap anywhere → jump to end state, then fade out */
    skipRef.current = () => {
      if (doneRef.current || fadingRef.current) return;
      clearAll();
      setInstant(true);
      endState();
      later(startFade, 150);
      later(finish, 150 + FADE_MS + 40);
    };

    return () => {
      clearAll();
      skipRef.current = null;
    };
  }, []);

  const handleSkip = () => {
    if (skipRef.current) skipRef.current();
  };

  return (
    <div className={`unit-boot${fading ? ' is-out' : ''}`} onClick={handleSkip}>
      <style>{STYLES}</style>
      <div className="unit-boot-flash" aria-hidden="true" />

      <div className="unit-boot-stage">
        <div className="unit-boot-log" aria-hidden="true">
          {LOG_LINES.map((line, i) => (
            <div
              key={line}
              className={`mono-label unit-boot-line${i < lines ? ' on' : ''}`}
            >
              {line}
              {i === lines - 1 && !titleOn && <span className="unit-boot-cursor" />}
            </div>
          ))}
        </div>

        <div className="seg-bar unit-boot-bar" aria-hidden="true">
          {Array.from({ length: SEG_COUNT }, (_, i) => (
            <span key={i} className={`seg${i < segs ? ' on' : ''}`} />
          ))}
        </div>

        <div className="doto unit-boot-title" role="heading" aria-level="1" aria-label={TITLE}>
          {TITLE.split('').map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`unit-boot-ch${titleOn ? ' on' : ''}`}
              style={{ transitionDelay: instant ? '0ms' : `${i * CH_STAGGER}ms` }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </div>
      </div>

      <div className="corner-tag unit-boot-tl" aria-hidden="true">DIWAN.OS — BOOT.SEQ</div>
      <div className="corner-tag unit-boot-skip" aria-hidden="true">TAP TO SKIP</div>
    </div>
  );
}
