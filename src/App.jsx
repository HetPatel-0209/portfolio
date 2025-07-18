import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { DarkModeProvider } from './context/DarkModeContext';
import './App.css';

// Main Portfolio Component
const Portfolio = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Certifications />
    <Contact />
    <Footer />
  </motion.div>
);

// Secret Admin Route Component
const SecretAdminRoute = () => (
  <div className="min-h-screen bg-gray-100">
    <AdminPanel onClose={() => window.history.back()} />
  </div>
);

function App() {
  return (
    <DarkModeProvider>
      <div className="App scroll-smooth overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          {/* Secret admin route - only you know this path */}
          <Route path="/unexplored" element={<SecretAdminRoute />} />
          {/* Fallback route */}
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </div>
    </DarkModeProvider>
  );
}

export default App;
