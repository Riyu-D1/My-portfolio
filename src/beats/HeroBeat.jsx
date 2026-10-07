/* ============================================================
   HERO BEAT — "DIWAN — UNIT 01" opening frame
   Nothing industrial-monochrome × Apple scroll cinema.

   Contract (src/beats/beat.css):
   · .beat is a full-viewport absolute layer — the master
     timeline owns visibility (autoAlpha) and adds .is-live,
     which fires the .rv / .rv-1..5 stagger on children.
   · This beat runs only ambient CSS loops (dot ping, scroll
     line) — transform + opacity only, reduced-motion safe.
   · Monochrome only. --accent red is reserved for TRANSMIT.
   ============================================================ */

export default function HeroBeat() {
  return (
    <section className="beat beat--hero" data-beat="hero">
      <style>{`
        /* ---------- HeroBeat scoped chrome ---------- */

        /* centre-left block — vertically centred, ~55% footprint;
           the right half stays empty for the floating 3D device */
        .beat--hero .beat--hero__center {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 0;
        }
        .beat--hero .beat--hero__col {
          width: 55%;
          text-align: left;
        }

        /* giant stacked Doto headline — one word per line */
        .beat--hero .beat--hero__headline {
          font-size: clamp(64px, 18vw, 200px);
          line-height: 0.86;
          margin: 20px 0 26px;
        }
        .beat--hero .beat--hero__headline .ln {
          display: block;
        }

        /* one-line Space Mono subhead */
        .beat--hero .beat--hero__sub {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        /* bottom-left telemetry cluster */
        .beat--hero .beat--hero__meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .beat--hero .beat--hero__status {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--text-primary);
        }

        /* solid status dot + expanding square ping — the hero's
           ONE accent: Nothing-red availability LED */
        .beat--hero .beat--hero__dot {
          position: relative;
          flex: none;
          width: 7px;
          height: 7px;
          background: var(--accent);
        }
        .beat--hero .beat--hero__dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid var(--accent);
          opacity: 0;
          animation: hero-dot-ping 2.4s var(--ease-out) infinite;
        }
        @keyframes hero-dot-ping {
          0%        { transform: scale(1);   opacity: 0.9; }
          70%, 100% { transform: scale(2.8); opacity: 0; }
        }

        /* bottom-right scroll cue — label over a 60px hairline */
        .beat--hero .beat--hero__scroll {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }
        .beat--hero .beat--hero__scroll-line {
          display: block;
          width: 60px;
          height: 1px;
          background: var(--text-primary);
          transform-origin: left;
          animation: hero-scroll-line 2.2s var(--ease-in-out) infinite;
        }
        @keyframes hero-scroll-line {
          0%   { transform: scaleX(0); transform-origin: left; }
          45%  { transform: scaleX(1); transform-origin: left; }
          55%  { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }

        @media (max-width: 720px) {
          .beat--hero .beat--hero__col { width: 100%; }
          .beat--hero .beat--hero__sub { white-space: normal; }
          .beat--hero .beat-bottomline { flex-wrap: wrap; }
        }

        @media (prefers-reduced-motion: reduce) {
          .beat--hero .beat--hero__dot::after {
            animation: none;
            opacity: 0;
          }
          .beat--hero .beat--hero__scroll-line {
            animation: none;
            transform: none;
          }
        }
      `}</style>

      {/* registration chrome */}
      <div className="beat-topline">
        <span className="corner-tag rv rv-1">RD — UNIT_01</span>
        <span className="corner-tag rv rv-1">PORTFOLIO V3 · MONO/OLED</span>
      </div>

      {/* centre-left title block — right half deliberately empty */}
      <div className="beat--hero__center">
        <div className="beat--hero__col">
          <p className="mono-label rv rv-1">// CREATIVE ENGINEER</p>
          <h1 className="doto beat--hero__headline">
            <span className="ln rv rv-2">CREATIVE</span>
            <span className="ln rv rv-3">DEVELOPER</span>
          </h1>
          <p className="beat--hero__sub rv rv-4">WEB · AI · HARDWARE · DESIGN</p>
        </div>
      </div>

      {/* telemetry + scroll cue */}
      <div className="beat-bottomline">
        <div className="beat--hero__meta">
          <span className="mono-label mono-label--dim rv rv-4">LOC 51.50°N 0.12°W</span>
          <span className="mono-label beat--hero__status rv rv-5">
            <span className="beat--hero__dot" aria-hidden="true" />
            STATUS: AVAILABLE FOR WORK
          </span>
        </div>
        <div className="beat--hero__scroll">
          <span className="mono-label mono-label--dim rv rv-5">SCROLL TO EXPLORE</span>
          <span className="beat--hero__scroll-line rv rv-5" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
