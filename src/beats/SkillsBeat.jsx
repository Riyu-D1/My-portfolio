import './beat.css';

/* ============================================================
   BEAT 04 — TELEMETRY / CAPABILITIES
   Four instrument modules (hairline frame-line panels) reporting
   skill capacity as segmented bars + mono readouts, plus one
   oversized Doto hero number. Scoped styles: .beat--telemetry.
   Visibility + .rv reveals are owned by the master GSAP timeline
   (.beat.is-live) — no scroll logic lives here.
   ============================================================ */

const MODULES = [
  {
    id: 'M·01',
    title: 'FRONTEND ENGINEERING',
    filled: 15,
    value: '94%',
    subs: ['REACT', 'NEXT.JS', 'THREE.JS / R3F', 'GSAP + MOTION', 'TAILWIND'],
  },
  {
    id: 'M·02',
    title: 'AI & AGENTS',
    filled: 13,
    value: '81%',
    subs: ['LLM APIS', 'AGENTIC SYSTEMS', 'COMPUTER VISION', 'AI TOOLING'],
  },
  {
    id: 'M·03',
    title: 'BACKEND & DATA',
    filled: 12,
    value: '75%',
    subs: ['NODE.JS', 'FASTAPI', 'POSTGRES', 'SUPABASE'],
  },
  {
    id: 'M·04',
    title: 'HARDWARE & EMBEDDED',
    filled: 11,
    value: '69%',
    subs: ['KICAD PCB', 'RP2040 / ESP32', 'QMK', '3D CAD + PRINT'],
  },
];

const SEGMENTS = 16;

export default function SkillsBeat() {
  return (
    <section className="beat beat--telemetry" data-beat="telemetry" aria-label="Skills telemetry">
      <style>{`
        /* ---------- layout: asymmetric instrument bay ---------- */
        .beat--telemetry .tele-body {
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: stretch;
          gap: clamp(24px, 3.5vw, 56px);
          padding: clamp(12px, 3vh, 40px) 0;
        }

        /* ---------- module grid: one row, four equal cells ---------- */
        .beat--telemetry .tele-grid {
          flex: 1 1 auto;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(16px, 1.6vw, 24px);
          align-content: center;
        }

        .beat--telemetry .tele-mod {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 16px 16px 18px;
          background: transparent;
        }

        .beat--telemetry .tele-mod-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
        }

        .beat--telemetry .tele-idx {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          color: var(--text-disabled);
          white-space: nowrap;
        }

        /* ---------- readout line: value / CAPACITY ---------- */
        .beat--telemetry .tele-readout {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
        }

        .beat--telemetry .tele-val {
          font-family: var(--font-mono);
          font-size: 22px;
          line-height: 1;
          color: var(--text-primary);
        }

        .beat--telemetry .tele-cap {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-disabled);
        }

        /* ---------- sub-items: tiny spec tags ---------- */
        .beat--telemetry .tele-subs {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 5px 12px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }

        .beat--telemetry .tele-subs li {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-disabled);
          line-height: 1.4;
        }

        /* ---------- hero readout: the one oversized Doto number ---------- */
        .beat--telemetry .tele-hero {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          gap: 10px;
          padding-bottom: clamp(8px, 5vh, 64px);
          padding-left: clamp(16px, 2.5vw, 44px);
          border-left: 1px solid var(--border);
          text-align: right;
        }

        .beat--telemetry .tele-hero-num {
          font-size: clamp(80px, 11vw, 160px);
          line-height: 0.85;
          /* the telemetry pop — hero readout in Nothing red */
          color: var(--accent);
        }

        .beat--telemetry .tele-hero-cap {
          text-align: right;
        }

        /* ---------- secondary telemetry row ---------- */
        .beat--telemetry .tele-sys {
          display: flex;
          align-items: baseline;
          gap: 14px;
        }

        .beat--telemetry .tele-sys-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .beat--telemetry .tele-sys-ok {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          color: var(--success);
        }

        /* ---------- breakpoints ---------- */
        @media (max-width: 1100px) {
          .beat--telemetry .tele-body {
            flex-direction: column;
            justify-content: center;
            gap: 24px;
          }
          .beat--telemetry .tele-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: 100%;
          }
          .beat--telemetry .tele-hero {
            flex-direction: row;
            align-items: flex-end;
            justify-content: flex-end;
            gap: 16px;
            border-left: 0;
            padding-left: 0;
            padding-bottom: 0;
            border-top: 1px solid var(--border);
            padding-top: 16px;
          }
          .beat--telemetry .tele-hero-num {
            font-size: clamp(72px, 14vw, 120px);
          }
        }

        @media (max-width: 560px) {
          .beat--telemetry .tele-body { padding: 8px 0; gap: 18px; }
          .beat--telemetry .tele-grid { gap: 10px; }
          .beat--telemetry .tele-mod { padding: 10px; gap: 9px; }
          .beat--telemetry .tele-val { font-size: 17px; }
          .beat--telemetry .tele-hero-num { font-size: clamp(56px, 17vw, 96px); }
          .beat--telemetry .tele-subs { gap: 4px 8px; }
          .beat--telemetry .tele-subs li { font-size: 9px; }
          .beat--telemetry .beat-bottomline { display: none; }
        }
      `}</style>

      {/* ---------- chapter ---------- */}
      <header className="beat-topline">
        <div className="beat-chapter">
          <span className="num">04</span>
          <span className="name rv">TELEMETRY — CAPABILITIES</span>
        </div>
        <span className="corner-tag rv">UNIT 01 · CH 04/05</span>
      </header>

      {/* ---------- instrument bay ---------- */}
      <div className="tele-body">
        <div className="tele-grid">
          {MODULES.map((m, i) => (
            <div key={m.id} className={`tele-mod frame-line rv rv-${i + 1}`}>
              <div className="tele-mod-head">
                <span className="mono-label">{m.title}</span>
                <span className="tele-idx">{m.id}</span>
              </div>

              <div className="seg-bar" role="img" aria-label={`${m.title} capacity ${m.value}`}>
                {Array.from({ length: SEGMENTS }, (_, s) => (
                  <div key={s} className={s < m.filled ? 'seg on' : 'seg'} />
                ))}
              </div>

              <div className="tele-readout">
                <span className="tele-val">{m.value}</span>
                <span className="tele-cap">CAPACITY</span>
              </div>

              <ul className="tele-subs">
                {m.subs.map((sub) => (
                  <li key={sub}>{sub}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---------- surprise: oversized Doto readout ---------- */}
        <aside className="tele-hero rv rv-5">
          <div className="tele-hero-num doto">04</div>
          <div className="tele-hero-cap mono-label mono-label--dim">
            DISCIPLINES / ONLINE
          </div>
        </aside>
      </div>

      {/* ---------- secondary telemetry ---------- */}
      <footer className="beat-bottomline">
        <div className="tele-sys rv rv-5">
          <span className="tele-sys-label">SYS.CHECK — ALL MODULES OPERATIONAL</span>
          <span className="tele-sys-ok">[ OK ]</span>
        </div>
        <span className="corner-tag rv rv-5">SCROLL ▾</span>
      </footer>
    </section>
  );
}
