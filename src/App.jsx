import { Routes, Route, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars -- false positive: motion.div used in JSX below
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';

const Footer = () => (
  <footer style={{
    borderTop: '1px solid var(--border)',
    background: 'var(--black)',
    padding: '2rem var(--pad)',
    fontFamily: 'var(--font-mono)',
  }}>
    <div className="container" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1.5rem',
      flexWrap: 'wrap',
    }}>
      <span className="mono-label">© 2025 RIYANSH DIWAN</span>
      <span className="mono-label mono-label--dim">UNIT_01 · SYSTEM NOMINAL</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <a href="#" className="mono-label pressable">GITHUB</a>
        <a href="#" className="mono-label pressable">LINKEDIN</a>
        <a href="#" className="mono-label pressable">X</a>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mono-label pressable" style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
        }}>[ TOP ]</button>
      </div>
    </div>
  </footer>
);

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

function App() {
  const location = useLocation();

  return (
    <Layout>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AboutPage />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </Layout>
  )
}

export default App
