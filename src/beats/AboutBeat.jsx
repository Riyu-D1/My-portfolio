/* ============================================================
   BEAT 02 — DIAGNOSTICS · subject file
   LEFT: spec sheet (dot-grid panel on ~40%) · RIGHT/lower:
   boot-log story · ONE surprise: a ghost Doto readout cropped
   off the bottom-right corner. All beat-specific styles live in
   the scoped <style> block below, prefixed .beat--diagnostics.
   ============================================================ */
export default function AboutBeat() {
  return (
    <section
      className="beat beat--diagnostics"
      data-beat="diagnostics"
      aria-label="Diagnostics — subject file"
    >
      <style>{`
        /* ---------- layout: asymmetric two-zone body ---------- */
        .beat--diagnostics { overflow: hidden; }

        .beat--diagnostics .diag-body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: clamp(32px, 6vw, 96px);
          padding-top: 5vh;
        }

        /* ---------- LEFT — subject specification ---------- */
        .beat--diagnostics .diag-spec {
          position: relative;
          width: 100%;
          max-width: 420px;
          margin-bottom: clamp(40px, 8vh, 110px); /* raised vs log */
        }

        /* dot-grid field on the right ~40% of the spec block only */
        .beat--diagnostics .diag-spec-dots {
          position: absolute;
          top: -14px;
          right: -10px;
          bottom: -14px;
          width: 40%;
          pointer-events: none;
        }

        .beat--diagnostics .diag-spec-head,
        .beat--diagnostics .diag-spec-rows {
          position: relative; /* keep text above the dot field */
        }

        .beat--diagnostics .diag-spec-head {
          margin-bottom: 18px;
        }

        .beat--diagnostics .diag-spec .spec-row:last-child {
          border-bottom: 1px solid var(--border);
        }

        /* status value + indicator dot — the beat's ONE red accent */
        .beat--diagnostics .diag-status {
          color: var(--text-display);
          font-weight: 700;
        }
        .beat--diagnostics .diag-status::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          margin-right: 9px;
          vertical-align: 2px;
          background: var(--accent);
          animation: diag-led 2.6s var(--ease-in-out) infinite;
        }
        @keyframes diag-led {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ---------- RIGHT / LOWER — system log ---------- */
        .beat--diagnostics .diag-log {
          width: 100%;
          max-width: 500px;
          margin-left: auto;
          border-top: 1px solid var(--border);
          padding-top: 18px;
        }

        .beat--diagnostics .diag-log-head {
          margin-bottom: 14px;
        }

        .beat--diagnostics .diag-log-line {
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 2.05;
          letter-spacing: 0.02em;
          color: var(--text-secondary);
          padding-left: 15px;   /* hanging indent under the ">" prompt */
          text-indent: -15px;
        }

        .beat--diagnostics .diag-caret {
          display: inline-block;
          width: 7px;
          height: 14px;
          margin-left: 7px;
          vertical-align: -2px;
          background: var(--text-secondary);
          animation: diag-blink 1.15s steps(1, end) infinite;
        }
        @keyframes diag-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        /* ---------- the ONE surprise — ghost readout ---------- */
        .beat--diagnostics .diag-ghost {
          position: absolute;
          right: -0.6ch;
          bottom: -0.14em;
          z-index: 0;
          font-size: clamp(200px, 29vw, 440px);
          font-weight: 700;
          line-height: 0.8;
          letter-spacing: 0;
          color: var(--text-display);
          opacity: 0;
          user-select: none;
          transition: opacity 1000ms var(--ease-out) 520ms;
        }
        .beat--diagnostics.is-live .diag-ghost { opacity: 0.06; }

        /* ---------- narrow screens: stack, keep asymmetry ---------- */
        @media (max-width: 900px) {
          .beat--diagnostics .diag-body {
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-end;
            gap: 42px;
          }
          .beat--diagnostics .diag-spec { margin-bottom: 0; }
          .beat--diagnostics .diag-log { margin-left: 0; }
          .beat--diagnostics .diag-ghost {
            font-size: clamp(170px, 46vw, 300px);
            right: -0.4ch;
          }
        }

        /* phones — compress spec + log so both fit the viewport */
        @media (max-width: 720px) {
          .beat--diagnostics .diag-body {
            gap: 24px;
            justify-content: flex-end;
            padding-top: 0;
          }
          .beat--diagnostics .diag-spec { max-width: 100%; }
          .beat--diagnostics .diag-spec-head { margin-bottom: 8px; }
          .beat--diagnostics .spec-row { padding: 6px 0; }
          .beat--diagnostics .diag-log { padding-top: 12px; }
          .beat--diagnostics .diag-log-line { font-size: 12px; line-height: 1.75; }
          .beat--diagnostics.is-live .diag-ghost { opacity: 0.04; }
        }

        /* ---------- reduced motion: static, still visible ---------- */
        @media (prefers-reduced-motion: reduce) {
          .beat--diagnostics .diag-ghost {
            opacity: 0.06;
            transition: none;
          }
          .beat--diagnostics .diag-status::before,
          .beat--diagnostics .diag-caret {
            animation: none;
          }
        }
      `}</style>

      {/* topline — chapter marker */}
      <div className="beat-topline">
        <div className="beat-chapter">
          <span className="num">02</span>
          <span className="name rv">DIAGNOSTICS — SUBJECT FILE</span>
        </div>
        <span className="corner-tag rv rv-2">FILE OPEN · READ-ONLY</span>
      </div>

      <div className="diag-body">
        {/* LEFT — subject specification */}
        <div className="diag-spec rv rv-1">
          <span className="diag-spec-dots dot-grid-subtle" aria-hidden="true" />
          <p className="mono-label diag-spec-head">SUBJECT SPECIFICATION</p>
          <div className="diag-spec-rows">
            <div className="spec-row">
              <span className="k">NAME</span>
              <span className="v">RIYANSH DIWAN</span>
            </div>
            <div className="spec-row">
              <span className="k">ROLE</span>
              <span className="v">CREATIVE ENGINEER</span>
            </div>
            <div className="spec-row">
              <span className="k">BASE</span>
              <span className="v">LONDON</span>
            </div>
            <div className="spec-row">
              <span className="k">FOCUS</span>
              <span className="v">WEB / AI / EMBEDDED</span>
            </div>
            <div className="spec-row">
              <span className="k">SECONDARY</span>
              <span className="v">DESIGN + MOTION</span>
            </div>
            <div className="spec-row">
              <span className="k">TERTIARY</span>
              <span className="v">PHOTOGRAPHY</span>
            </div>
            <div className="spec-row">
              <span className="k">STATUS</span>
              <span className="v diag-status">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* RIGHT / LOWER — system log */}
        <div className="diag-log">
          <p className="mono-label mono-label--dim diag-log-head rv rv-2">
            SYSTEM LOG
          </p>
          <p className="diag-log-line rv rv-2">
            &gt; young entrepreneur · tech obsessive
          </p>
          <p className="diag-log-line rv rv-3">
            &gt; builds ai-powered platforms + productivity tools
          </p>
          <p className="diag-log-line rv rv-4">
            &gt; ships ideas into the physical world — 3d printing
          </p>
          <p className="diag-log-line rv rv-5">
            &gt; captures perspective through photography
          </p>
          <p className="diag-log-line rv rv-5">
            &gt; status: always learning
            <span className="diag-caret" aria-hidden="true" />
          </p>
        </div>
      </div>

      {/* the ONE surprise — ghost Doto readout bleeding off the corner */}
      <span className="diag-ghost doto" aria-hidden="true">DIAG</span>
    </section>
  );
}
