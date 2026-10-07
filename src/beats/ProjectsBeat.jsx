/* ============================================================
   BEAT 03 — MODULES · selected work
   Three stacked .mod-panel layers inside one .beat. The master
   GSAP timeline in Home.jsx owns ALL visibility:
     · autoAlpha + y  on .mod-panel--1 / --2 / --3  (scrubbed)
     · .is-live       toggled per panel by segTrigger
   This file ships markup + scoped styles only — no animation
   logic here. Children stagger via .prv transitions keyed off
   .mod-panel.is-live (mirrors the .beat.is-live .rv contract).
   ============================================================ */

const MODULES = [
  {
    id: 1,
    idx: '01',
    title: 'SMARTCV',
    tag: 'AI · WEB PLATFORM',
    desc: 'ai-powered cv builder — personalised professional resumes in minutes',
    stack: 'REACT / LLM / PDF ENGINE',
    status: 'DEPLOYED',
    year: '2024',
  },
  {
    id: 2,
    idx: '02',
    title: 'STUDY FLOW',
    tag: 'AI · STUDY APP',
    desc: 'study tools meet social — notes, flashcards, quizzes for students',
    stack: 'REACT / AI / SUPABASE',
    status: 'DEPLOYED',
    year: '2024',
  },
  {
    id: 3,
    idx: '03',
    title: 'LAUNCH LAYER',
    tag: 'BRAND · WEB SERVICE',
    desc: 'custom websites + brand presence for growing businesses',
    stack: 'VITE / REACT / HEADLESS CMS',
    status: 'DEPLOYED',
    year: '2024',
  },
];

export default function ProjectsBeat() {
  return (
    <section className="beat beat--modules" data-beat="modules">
      <style>{`
        /* ===== MODULES beat — scoped (.beat--modules only) ===== */

        /* top-right module counter — shared chrome, rides the beat fade */
        .beat--modules .mod-sel {
          padding-top: 10px;
          white-space: nowrap;
        }

        /* the orchestrator scrubs .beat--modules autoAlpha and toggles
           .is-live on .mod-panel--N — NOT on the beat itself — so the
           shared topline chrome opts out of the hidden .rv base state
           (keeps the .rv hooks if a future timeline wants them) */
        .beat--modules .beat-topline .rv {
          opacity: 1;
          transform: none;
        }

        /* ---- stacked panels: absolute, hidden until scrubbed in ---- */
        .beat--modules .mod-panel {
          position: absolute;
          inset: 0;
          padding: var(--pad);
          /* clear the marquee strip pinned at overlay-stack bottom */
          padding-bottom: calc(var(--pad) + 72px);
          display: flex;
          align-items: flex-end;          /* card anchors lower-left */
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .beat--modules .mod-card {
          width: 100%;
          max-width: 560px;               /* device floats frame-right */
        }

        /* asymmetric indent — middle module steps inward */
        .beat--modules .mod-panel--2 .mod-card {
          margin-left: clamp(0px, 6vw, 120px);
        }

        .beat--modules .mod-idx {
          font-family: var(--font-display);
          font-size: clamp(72px, 11vw, 140px);
          line-height: 0.85;
          letter-spacing: 0.01em;
          /* the modules pop — giant dot-matrix index in Nothing red */
          color: var(--accent);
          margin-left: -0.05em;
          margin-bottom: clamp(8px, 1.4vw, 18px);
        }

        .beat--modules .mod-title {
          font-family: var(--font-body);
          font-size: clamp(28px, 4.4vw, 56px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: var(--text-display);
        }

        .beat--modules .mod-tag { margin-top: 14px; }

        .beat--modules .mod-desc {
          margin-top: 18px;
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 46ch;
        }

        .beat--modules .mod-specs { margin-top: 24px; }
        .beat--modules .mod-specs .spec-row:last-child {
          border-bottom: 1px solid var(--border);
        }
        .beat--modules .mod-specs .v.ok { color: var(--success); }

        .beat--modules .mod-link {
          display: inline-block;
          margin-top: 28px;
          padding: 10px 18px;
          border: 1px solid var(--border-visible);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-primary);
          background: transparent;
          pointer-events: auto;
        }

        /* ---- per-panel reveal: mirrors .beat.is-live .rv contract ---- */
        .beat--modules .mod-panel .prv {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 480ms var(--ease-out),
                      transform 480ms var(--ease-out);
        }
        .beat--modules .mod-panel.is-live .prv {
          opacity: 1;
          transform: translateY(0);
        }
        .beat--modules .mod-panel.is-live .prv-1 { transition-delay: 70ms; }
        .beat--modules .mod-panel.is-live .prv-2 { transition-delay: 140ms; }
        .beat--modules .mod-panel.is-live .prv-3 { transition-delay: 220ms; }
        .beat--modules .mod-panel.is-live .prv-4 { transition-delay: 300ms; }
        .beat--modules .mod-panel.is-live .prv-5 { transition-delay: 380ms; }

        @media (hover: hover) and (pointer: fine) {
          .beat--modules .mod-link:hover { border-color: var(--text-disabled); }
        }

        @media (max-width: 720px) {
          .beat--modules .mod-panel { padding: 18px; padding-bottom: 90px; }
          .beat--modules .mod-panel--2 .mod-card { margin-left: 0; }
        }

        /* ---- static fallback: reduced motion → panels stack in flow ---- */
        @media (prefers-reduced-motion: reduce) {
          .beat--modules .mod-panel {
            position: relative;
            inset: auto;
            opacity: 1 !important;
            visibility: visible !important;
            padding: 9vh 0 7vh;
            border-top: 1px solid var(--border);
          }
          .beat--modules .mod-panel .prv {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* shared chrome: chapter + module counter */}
      <div className="beat-topline">
        <div className="beat-chapter">
          <span className="num">03</span>
          <span className="name rv">MODULES — SELECTED WORK</span>
        </div>
        <span className="mod-sel mono-label mono-label--dim rv rv-1">MODULE SELECT</span>
      </div>

      {/* three stacked spec-sheet panels — scrubbed by Home.jsx */}
      {MODULES.map((m) => (
        <article key={m.id} className={`mod-panel mod-panel--${m.id}`}>
          <div className="mod-card">
            <div className="mod-idx prv">{m.idx}</div>
            <h3 className="mod-title prv prv-1">{m.title}</h3>
            <div className="mod-tag mono-label prv prv-2">{m.tag}</div>
            <p className="mod-desc prv prv-3">{m.desc}</p>
            <div className="mod-specs prv prv-4">
              <div className="spec-row">
                <span className="k">STACK</span>
                <span className="v">{m.stack}</span>
              </div>
              <div className="spec-row">
                <span className="k">STATUS</span>
                <span className="v ok">{m.status}</span>
              </div>
              <div className="spec-row">
                <span className="k">YEAR</span>
                <span className="v">{m.year}</span>
              </div>
            </div>
            <a
              className="mod-link pressable prv prv-5"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              [ VIEW ]
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
