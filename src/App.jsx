import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';

const Footer = () => (
  <footer style={{
    padding: '3rem 4rem',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    background: '#050505',
  }}>
    <div className="container" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'var(--font-main)',
      fontSize: '0.8rem',
      color: '#555',
      letterSpacing: '0.05em',
    }}>
      <span>© 2025 RD</span>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: '#777', transition: 'color 0.3s' }}>GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#777', transition: 'color 0.3s' }}>LinkedIn</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#777', transition: 'color 0.3s' }}>Twitter</a>
      </div>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
        background: 'none',
        border: 'none',
        color: '#555',
        cursor: 'pointer',
        fontSize: '0.8rem',
        letterSpacing: '0.05em',
        fontFamily: 'var(--font-main)',
      }}>Back to top ↑</button>
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
