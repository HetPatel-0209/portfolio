import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase } from 'react-icons/fa';
import { certificationsAPI, projectsAPI } from '../api/index.js';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleLinkClick = (href) => {
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const elementPosition = element.offsetTop - 80; // Account for header height
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [certifications, setCertifications] = useState([]);


  useEffect(() => {
    fetchProjects();
    fetchCertifications();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCertifications = async () => {
    try {
      // Fetch from API using the new API configuration
      const response = await certificationsAPI.getAll();
      setCertifications(response.data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      // Use default certifications if API is not available
      setCertifications([]);
    } finally {
      setLoading(false);
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-60 h-60 md:w-80 md:h-80 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <div className="w-52 h-52 md:w-72 md:h-72 bg-[#f9fafb] dark:bg-[#111827] rounded-full flex items-center justify-center">
                  <>
                    {
                      isMobile ? <FaCode size={80} className="text-blue-600" /> : <FaCode size={120} className="text-blue-600" />
                    }
                  </>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Backend Developer & Problem Solver
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a passionate backend developer with expertise in building scalable web applications
              and APIs. I love working with modern technologies and frameworks to create efficient,
              maintainable, and secure server-side solutions.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              My journey in software development has equipped me with strong problem-solving skills
              and a deep understanding of system architecture, database design, and API development.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                {...fadeInUp}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md card-hover transition-colors duration-300"
              >
                <FaServer className="text-4xl text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Backend Development</h4>
                <p className="text-gray-600 dark:text-gray-300">Building robust server-side applications</p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md card-hover transition-colors duration-300"
              >
                <FaDatabase className="text-4xl text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Database Design</h4>
                <p className="text-gray-600 dark:text-gray-300">Designing efficient database schemas</p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md card-hover transition-colors duration-300"
              >
                <FaCode className="text-4xl text-purple-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">API Development</h4>
                <p className="text-gray-600 dark:text-gray-300">Creating REST APIs and Integrating MCP Servers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Redesigned Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">My Journey in Numbers</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.button 
              key={'Projects'} 
              onClick={() => handleLinkClick('#projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl md:text-3xl font-bold text-white">{projects.length}+</span>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">Projects</h4>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Completed & Deployed</p>
                  </div>
                </div>
              </div>
            </motion.button>

            <motion.button 
              key={'Certifications'} 
              onClick={() => handleLinkClick('#certifications')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl md:text-3xl font-bold text-white">{certifications.length}</span>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">Certifications</h4>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Professional & Technical</p>
                  </div>
                </div>
              </div>
            </motion.button>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="group sm:col-span-2 lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl md:text-3xl font-bold text-white">{new Set(certifications.flatMap(cert => cert.skills)).size}+</span>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">Skills</h4>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Technologies & Tools</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
