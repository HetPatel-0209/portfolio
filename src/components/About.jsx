import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase } from 'react-icons/fa';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
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
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center">
                  <FaCode size={120} className="text-blue-600" />
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
            <h3 className="text-3xl font-bold text-gray-900">
              Backend Developer & Problem Solver
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm a passionate backend developer with expertise in building scalable web applications 
              and APIs. I love working with modern technologies and frameworks to create efficient, 
              maintainable, and secure server-side solutions.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              My journey in software development has equipped me with strong problem-solving skills 
              and a deep understanding of system architecture, database design, and API development.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                {...fadeInUp}
                className="text-center p-6 bg-white rounded-lg shadow-md card-hover"
              >
                <FaServer className="text-4xl text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Backend Development</h4>
                <p className="text-gray-600">Building robust server-side applications</p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="text-center p-6 bg-white rounded-lg shadow-md card-hover"
              >
                <FaDatabase className="text-4xl text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Database Design</h4>
                <p className="text-gray-600">Designing efficient database schemas</p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="text-center p-6 bg-white rounded-lg shadow-md card-hover"
              >
                <FaCode className="text-4xl text-purple-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">API Development</h4>
                <p className="text-gray-600">Creating REST APIs and Integrating MCP Servers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
