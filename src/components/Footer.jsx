import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaGithub,
      name: 'GitHub',
      url: 'https://github.com/HetPatel-0209',
      color: 'hover:text-gray-400'
    },
    {
      icon: FaLinkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/het-patel-428055253',
      color: 'hover:text-blue-400'
    },
    {
      icon: FaEnvelope,
      name: 'Email',
      url: 'mailto:hetptl09104@gmail.com',
      color: 'hover:text-red-400'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4">Het Patel</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Backend Developer passionate about building scalable web applications
              and crafting efficient server-side solutions. Always learning and
              exploring new technologies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors duration-300`}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-gray-400">
              <p>
                <span className="font-medium">Email:</span><br />
                <a
                  href="mailto:hetptl09104@gmail.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  hetptl09104@gmail.com
                </a>
              </p>
              <p>
                <span className="font-medium">Phone:</span><br />
                <a
                  href="tel:+919099187329"
                  className="hover:text-white transition-colors duration-300"
                >
                  +91 90991 87329
                </a>
              </p>
              <p>
                <span className="font-medium">Location:</span><br />
                Anand, Gujarat
              </p>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-6"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start">
                ©{currentYear} Het Patel. Made with <FaHeart className="text-red-500 mx-1" size={12} />, lots of coffee and Co-Pilot
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <button
                onClick={() => handleLinkClick('#home')}
                className="hover:text-white transition-colors duration-300"
              >
                Back to Top
              </button>
              <a
                href="/privacy-policy"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>

        {/* Scroll to Top Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center pb-4"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              ↑
            </motion.div>
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
