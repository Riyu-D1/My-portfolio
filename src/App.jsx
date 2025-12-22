import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';

const Footer = () => (
  <footer style={{ padding: '4rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem' }}>
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>© 2025 Riyansh Diwan</span>
      <span>Made with GSAP & React</span>
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
