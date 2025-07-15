import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { experiencesAPI } from '../api/index.js';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default experience data
  const defaultExperiences = [
    {
      id: 1,
      title: "Senior Backend Developer",
      company: "Tech Solutions Inc.",
      location: "Anand, Gujarat",
      startDate: "2022-01",
      endDate: "present",
      description: "Led backend development for enterprise applications, designed microservices architecture, and optimized database performance. Managed a team of 5 developers and implemented CI/CD pipelines.",
      technologies: ["Node.js", "MongoDB", "AWS", "Docker", "Kubernetes"],
      achievements: [
        "Improved API response time by 40%",
        "Led migration to microservices architecture",
        "Implemented automated testing reducing bugs by 60%"
      ]
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      startDate: "2020-03",
      endDate: "2021-12",
      description: "Developed RESTful APIs for mobile and web applications, integrated third-party services, and maintained database systems. Collaborated with frontend team to deliver seamless user experiences.",
      technologies: ["Python", "Django", "PostgreSQL", "Redis", "AWS"],
      achievements: [
        "Built scalable API serving 1M+ requests daily",
        "Integrated payment systems and notifications",
        "Reduced server costs by 30% through optimization"
      ]
    },
    {
      id: 3,
      title: "Junior Backend Developer",
      company: "WebDev Agency",
      location: "Remote",
      startDate: "2019-06",
      endDate: "2020-02",
      description: "Worked on various client projects, developing custom web applications and APIs. Gained experience with different technologies and frameworks while working in an agile environment.",
      technologies: ["PHP", "MySQL", "Laravel", "JavaScript", "jQuery"],
      achievements: [
        "Delivered 15+ client projects successfully",
        "Learned and adapted to new technologies quickly",
        "Received positive feedback from clients"
      ]
    },
    {
      id: 4,
      title: "Backend Developer Intern",
      company: "Innovation Labs",
      location: "New York, NY",
      startDate: "2018-09",
      endDate: "2019-05",
      description: "Assisted in developing internal tools and APIs, learned best practices in software development, and contributed to code reviews. Gained hands-on experience with modern development practices.",
      technologies: ["Java", "Spring Boot", "MySQL", "Git", "Maven"],
      achievements: [
        "Developed internal dashboard for project tracking",
        "Contributed to code review process",
        "Completed training in agile methodologies"
      ]
    }
  ];

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      // Fetch from API using the new API configuration
      const response = await experiencesAPI.getAll();
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      // Use default experiences if API is not available
      setExperiences(defaultExperiences);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (dateString === 'present') return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading experience...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            My professional journey in backend development and the experiences that shaped my expertise
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-blue-200"></div>

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center z-10">
                <FaBriefcase className="text-white text-sm" />
              </div>

              {/* Experience card */}
              <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {experience.title}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium mb-2">
                        {experience.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        {experience.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{experience.description}</p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
