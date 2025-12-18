import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';

const Footer = () => (
  <footer style={{ padding: '4rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem' }}>
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>© 2025 Riyansh D1</span>
      <span>Made with GSAP & React</span>
    </div>
  </footer>
);

function App() {
  return (
    <Layout>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </Layout>
  )
}

export default App
