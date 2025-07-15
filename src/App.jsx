import React, { useState } from 'react';
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
import './App.css';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
  };

  return (
    <div className="App scroll-smooth overflow-x-hidden">
      <Navbar toggleAdmin={toggleAdmin} />
      
      {showAdmin ? (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;
