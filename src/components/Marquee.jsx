// DIWAN — UNIT 01 · marquee
// Hairline ticker strip. Space Mono (restraint — not Doto). Items render
// twice on a max-content track; CSS translates 0 → -50% for a seamless loop.
export default function Marquee({ items = [], className = '' }) {
  const loop = [...items, ...items];

  return (
    <div className={`mq${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className="mq-track">
        {loop.map((item, i) => (
          <span className="mq-item" key={i}>{item}</span>
        ))}
      </div>

      <style>{`
        .mq {
          height: 44px;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          pointer-events: none;
          user-select: none;
        }
        .mq-track {
          display: flex;
          flex: none;
          flex-wrap: nowrap;
          align-items: center;
          width: max-content;
          animation: mq-scroll 28s linear infinite;
        }
        .mq-item {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-disabled);
          white-space: nowrap;
        }
        .mq-item::after {
          content: '·';
          margin: 0 1.6em;
          color: var(--border-visible);
        }
        @keyframes mq-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mq-track { animation-play-state: paused; }
        }
      `}</style>
    </div>
  );
}
