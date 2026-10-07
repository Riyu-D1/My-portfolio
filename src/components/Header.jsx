// DIWAN — UNIT 01 · header
// Flat instrument bar over OLED black. Transparent, hairline bottom border,
// no glass / pill / scroll-spy — InstrumentChrome owns the mode readout.
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToBeat } from '../scene/scrollRig';

const BEATS = [
  { label: 'OVERVIEW', id: 'hero' },
  { label: 'DIAGNOSTICS', id: 'diagnostics' },
  { label: 'MODULES', id: 'modules' },
  { label: 'TELEMETRY', id: 'telemetry' },
  { label: 'TRANSMIT', id: 'transmit' },
];

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onAbout = pathname === '/about';

  // Beats no-op off the home track; OVERVIEW routes back to '/'.
  const goBeat = (id) => {
    if (onAbout) {
      if (id === 'hero') navigate('/');
      return;
    }
    scrollToBeat(id);
  };

  return (
    <header className="hd">
      <div className="hd-left">
        <button type="button" className="hd-logo" onClick={() => goBeat('hero')}>
          RD·01
        </button>
        <span className="mono-label mono-label--dim hd-status" aria-hidden="true">
          <i className="hd-led" />
          [SYS.OK]
        </span>
      </div>

      <nav className="hd-nav" aria-label="Sections">
        {BEATS.map((b) => (
          <button
            key={b.id}
            type="button"
            className="hd-btn"
            onClick={() => goBeat(b.id)}
          >
            {b.label}
          </button>
        ))}
        <button
          type="button"
          className={`hd-btn${onAbout ? ' is-active' : ''}`}
          onClick={() => navigate('/about')}
        >
          SPEC SHEET
        </button>
      </nav>

      <style>{`
        .hd {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 40;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          height: 52px;
          padding: 14px var(--pad);
          background: transparent;
          border-bottom: 1px solid var(--border);
        }
        .hd-left {
          display: flex;
          align-items: baseline;
          gap: 14px;
          flex: none;
        }
        .hd-logo {
          appearance: none;
          background: none;
          border: none;
          padding: 0;
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--text-primary);
          cursor: pointer;
          transition: color var(--dur-micro) var(--ease-out);
        }
        .hd-logo:hover { color: var(--text-display); }
        .hd-logo:active { transform: scale(0.97); }
        .hd-nav {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: clamp(14px, 2.2vw, 28px);
          min-width: 0;
          overflow-x: auto;
          scrollbar-width: none;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
        }
        .hd-nav::-webkit-scrollbar { display: none; }
        .hd-btn {
          appearance: none;
          background: none;
          border: none;
          padding: 0;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--dur-micro) var(--ease-out);
        }
        .hd-btn:hover { color: var(--text-display); }
        .hd-btn:active { transform: scale(0.97); }
        .hd-btn.is-active { color: var(--text-primary); }

        @media (max-width: 720px) {
          .hd-nav { flex: 1; }
        }
        .hd-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }
        .hd-led {
          width: 5px;
          height: 5px;
          background: var(--accent);
        }
        @media (max-width: 480px) {
          .hd-status { display: none; }
        }
      `}</style>
    </header>
  );
}
