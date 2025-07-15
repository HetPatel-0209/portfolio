import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaDatabase, FaServer } from 'react-icons/fa';
import { projectsAPI } from '../api/index.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default projects data
  const defaultProjects = [
    {
      id: 1,
      title: "E-commerce API",
      description: "RESTful API for an e-commerce platform with user authentication, product management, and order processing. Built with Node.js, Express, and MongoDB.",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Stripe"],
      githubUrl: "https://github.com/HetPatel-0209/ecommerce-api",
      projectUrl: "https://ecommerce-api-demo.herokuapp.com",
      image: "/api-placeholder.jpg",
      category: "API Development"
    },
    {
      id: 2,
      title: "Task Management System",
      description: "A comprehensive task management system with real-time updates, team collaboration features, and advanced filtering. Built with Django and PostgreSQL.",
      technologies: ["Django", "PostgreSQL", "Redis", "WebSocket", "Docker"],
      githubUrl: "https://github.com/HetPatel-0209/task-management",
      projectUrl: "https://task-manager-demo.com",
      image: "/task-placeholder.jpg",
      category: "Web Application"
    },
    {
      id: 3,
      title: "Microservices Architecture",
      description: "Scalable microservices architecture with API Gateway, service discovery, and containerized deployment. Implemented with Spring Boot and Docker.",
      technologies: ["Spring Boot", "Docker", "Kubernetes", "MySQL", "RabbitMQ"],
      githubUrl: "https://github.com/HetPatel-0209/microservices-demo",
      projectUrl: null,
      image: "/microservices-placeholder.jpg",
      category: "System Architecture"
    },
    {
      id: 4,
      title: "Real-time Chat Application",
      description: "Real-time chat application with multiple rooms, file sharing, and message history. Built with Socket.io and Express.",
      technologies: ["Socket.io", "Express", "MongoDB", "JWT", "Multer"],
      githubUrl: "https://github.com/HetPatel-0209/realtime-chat",
      projectUrl: "https://realtime-chat-demo.com",
      image: "/chat-placeholder.jpg",
      category: "Real-time Application"
    },
    {
      id: 5,
      title: "Data Analytics Dashboard",
      description: "Backend API for a data analytics dashboard with complex queries, caching, and data visualization endpoints. Built with Flask and PostgreSQL.",
      technologies: ["Flask", "PostgreSQL", "Redis", "Pandas", "Celery"],
      githubUrl: "https://github.com/HetPatel-0209/analytics-dashboard",
      projectUrl: "https://analytics-dashboard-demo.com",
      image: "/analytics-placeholder.jpg",
      category: "Data Processing"
    },
    {
      id: 6,
      title: "Authentication Service",
      description: "Centralized authentication service with OAuth2, JWT tokens, and role-based access control. Built with Node.js and MongoDB.",
      technologies: ["Node.js", "MongoDB", "JWT", "OAuth2", "Express"],
      githubUrl: "https://github.com/HetPatel-0209/auth-service",
      projectUrl: null,
      image: "/auth-placeholder.jpg",
      category: "Security"
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Fetch from API using the new API configuration
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Use default projects if API is not available
      setProjects(defaultProjects);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each project demonstrates different aspects of backend development and system architecture.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
            >
              <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <FaCode size={48} className="mx-auto mb-4" />
                  <p className="text-sm font-medium">{project.category}</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      <FaGithub size={20} />
                    </a>
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                      >
                        <FaExternalLinkAlt size={20} />
                      </a>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {project.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/HetPatel-0209"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            <FaGithub className="mr-2" />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
