// Camera/scene rig — a plain mutable object.
// The master GSAP timeline in Home.jsx scrubs these numbers;
// the R3F render loop reads them every frame. Scroll NEVER
// re-renders React — that's what keeps it at 60fps.
export const rig = {
  // camera position
  px: 0, py: 0.35, pz: 7.5,
  // camera look-at target
  tx: 0, ty: 0.2, tz: 0,
  // device group rotation
  rotY: 0,
  // material mode 0=wire 1=solid 2=glass (float, lerped)
  matMode: 0,
  // screen glow intensity multiplier
  glow: 1,
  // scroll progress 0..1 (read by InstrumentChrome HUD)
  progress: 0,
  // current beat name (HUD readout) + CRT screen mode
  mode: 'BOOT',
  screen: 'RD',
  // active accent — '#d71921' Nothing red by default, user-swappable
  accent: (typeof localStorage !== 'undefined' && localStorage.getItem('unitAccent')) || '#d71921',
};

// accent palette — basic hues tuned for OLED black
export const ACCENTS = [
  { id: 'red',    hex: '#d71921', label: 'RED' },
  { id: 'blue',   hex: '#3d7bff', label: 'BLU' },
  { id: 'yellow', hex: '#ffd400', label: 'YLW' },
  { id: 'green',  hex: '#3ae374', label: 'GRN' },
];

export function setAccent(hex) {
  rig.accent = hex;
  try { localStorage.setItem('unitAccent', hex); } catch { /* private mode */ }
}

export const BEATS = ['hero', 'diagnostics', 'modules', 'telemetry', 'transmit'];

// Center of each beat as a fraction of SCROLL PROGRESS (0..1).
// Progress maps to (trackHeight − viewportHeight), NOT trackHeight —
// so we compute the absolute offset ourselves instead of using % markers.
const BEAT_CENTER = {
  hero: 0.08,
  diagnostics: 0.25,
  modules: 0.5,
  telemetry: 0.75,
  transmit: 0.92,
};

export function scrollToBeat(id) {
  const f = BEAT_CENTER[id];
  const track = document.querySelector('.scroll-track');
  if (f == null || !track) return;
  const trackTop = track.getBoundingClientRect().top + window.scrollY;
  const y = trackTop + f * (track.offsetHeight - window.innerHeight);
  const lenis = window.__unit?.lenis;
  if (lenis) lenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: 'smooth' });
}
