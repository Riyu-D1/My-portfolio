import { useEffect, useRef, useState } from 'react';

const SERVICES = ['WEB', 'DESIGN', 'BRAND', 'AI', 'OTHER'];

export default function ContactBeat() {
  const [service, setService] = useState('WEB');
  const [sent, setSent] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sent) return;
    setSent(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSent(false), 2500);
  };

  return (
    <section className="beat beat--transmit" data-beat="transmit">
      <style>{`
        /* ---------- TRANSMIT — scoped beat styles ---------- */
        .beat--transmit .tx-body {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: clamp(24px, 5vw, 72px);
          min-height: 0;
        }

        /* left column — ~40% */
        .beat--transmit .tx-left { max-width: 40%; }
        .beat--transmit .tx-headline {
          font-size: clamp(56px, 11vw, 140px);
          line-height: 0.9;
        }
        .beat--transmit .tx-lines {
          list-style: none;
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .beat--transmit .tx-lines .lit { color: var(--text-primary); }
        .beat--transmit .tx-mail { color: inherit; }
        @media (hover: hover) and (pointer: fine) {
          .beat--transmit .tx-mail:hover { color: var(--text-primary); }
        }

        /* signal indicator — the accent moment */
        .beat--transmit .tx-sig {
          margin-top: 38px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .beat--transmit .sig-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: tx-sig-pulse 2.4s var(--ease-in-out) infinite;
        }
        @keyframes tx-sig-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.35; transform: scale(0.8); }
        }

        /* right column — control panel */
        .beat--transmit .tx-panel {
          width: min(460px, 100%);
          flex-shrink: 0;
          background: transparent;
          padding: clamp(20px, 2.6vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .beat--transmit .tx-panel-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        .beat--transmit .tx-panel-head .seg-bar { max-width: 120px; }

        .beat--transmit .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .beat--transmit input,
        .beat--transmit textarea {
          width: 100%;
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-primary);
          caret-color: var(--accent);
          background: transparent;
          border: 1px solid var(--border-visible);
          border-radius: 4px;
          padding: 10px 12px;
          outline: none;
          transition: border-color var(--dur-ui) var(--ease-out);
        }
        .beat--transmit input:focus,
        .beat--transmit textarea:focus {
          border-color: var(--text-primary);
        }
        .beat--transmit textarea {
          resize: vertical;
          min-height: 96px;
        }

        /* mechanical segment selector */
        .beat--transmit .tx-segments {
          display: flex;
          flex-wrap: wrap;
        }
        .beat--transmit .tx-seg {
          position: relative;
          margin-left: -1px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid var(--border-visible);
          padding: 9px 14px;
          cursor: pointer;
          transition: transform var(--dur-micro) var(--ease-out),
                      color var(--dur-micro) var(--ease-out),
                      border-color var(--dur-micro) var(--ease-out);
        }
        .beat--transmit .tx-seg:first-child { margin-left: 0; }
        .beat--transmit .tx-seg:active { transform: scale(0.97); }
        .beat--transmit .tx-seg.is-on {
          z-index: 1;
          border-color: var(--text-primary);
          color: var(--text-primary);
        }
        @media (hover: hover) and (pointer: fine) {
          .beat--transmit .tx-seg:hover { color: var(--text-primary); }
        }

        /* submit */
        .beat--transmit .tx-submit {
          margin-top: 2px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--black);
          background: var(--accent);
          border: 1px solid var(--accent);
          padding: 13px 16px;
          cursor: pointer;
          opacity: 0.92;
          transition: transform var(--dur-micro) var(--ease-out),
                      opacity var(--dur-ui) var(--ease-out),
                      background-color var(--dur-ui) var(--ease-out),
                      border-color var(--dur-ui) var(--ease-out);
        }
        .beat--transmit .tx-submit:active { transform: scale(0.97); }
        .beat--transmit .tx-submit.is-sent {
          background: var(--success);
          border-color: var(--success);
          opacity: 1;
        }
        @media (hover: hover) and (pointer: fine) {
          .beat--transmit .tx-submit:hover { opacity: 1; }
        }

        @media (max-width: 900px) {
          .beat--transmit .tx-body {
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-end;
          }
          .beat--transmit .tx-left { max-width: none; }
          .beat--transmit .tx-panel { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .beat--transmit .sig-dot { animation: none; }
        }
      `}</style>

      <header className="beat-topline">
        <div className="beat-chapter">
          <span className="num">05</span>
          <span className="name">TRANSMIT — OPEN CHANNEL</span>
        </div>
        <span className="corner-tag">UPLINK // TX-05</span>
      </header>

      <div className="tx-body">
        <div className="tx-left">
          <h2 className="doto tx-headline rv">TRANSMIT</h2>
          <ul className="tx-lines rv rv-1">
            <li className="lit">CHANNEL: OPEN</li>
            <li>{'RESPONSE < 24H'}</li>
            <li>
              <a className="tx-mail" href="mailto:hello@riyansh.dev">
                FREQ: HELLO@RIYANSH.DEV
              </a>
            </li>
          </ul>
          <div className="tx-sig rv rv-2">
            <span className="sig-dot" aria-hidden="true" />
            <span className="mono-label">SIG</span>
          </div>
        </div>

        <form id="contact" className="tx-panel frame-line rv rv-3" onSubmit={handleSubmit}>
          <div className="tx-panel-head">
            <span className="mono-label mono-label--bright">TX CONSOLE</span>
            <span className="seg-bar" aria-hidden="true">
              <span className="seg on" />
              <span className="seg on" />
              <span className="seg on" />
              <span className="seg" />
              <span className="seg" />
            </span>
          </div>

          <div className="form-field">
            <label className="mono-label" htmlFor="tx-name">NAME</label>
            <input id="tx-name" name="name" type="text" autoComplete="name" required />
          </div>

          <div className="form-field">
            <label className="mono-label" htmlFor="tx-email">EMAIL</label>
            <input id="tx-email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="form-field">
            <span className="mono-label" id="tx-service-label">SERVICE</span>
            <div className="tx-segments" role="group" aria-labelledby="tx-service-label">
              {SERVICES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`tx-seg${service === s ? ' is-on' : ''}`}
                  aria-pressed={service === s}
                  onClick={() => setService(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <input type="hidden" name="service" value={service} />
          </div>

          <div className="form-field">
            <label className="mono-label" htmlFor="tx-msg">MESSAGE</label>
            <textarea id="tx-msg" name="message" required />
          </div>

          <button
            type="submit"
            className={`tx-submit${sent ? ' is-sent' : ''}`}
            disabled={sent}
          >
            {sent ? '[ SENT — ACK ]' : '[ TRANSMIT ]'}
          </button>
        </form>
      </div>

      <footer className="beat-bottomline">
        <span className="corner-tag">LINK // STABLE</span>
        <span className="corner-tag">DIWAN — UNIT 01</span>
      </footer>
    </section>
  );
}
