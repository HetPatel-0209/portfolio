import React from 'react';
import { motion } from 'framer-motion';
import { FaJs, FaPython, FaNode, FaDatabase, FaGitAlt, FaGithub, FaJava, FaPhp, FaCloud, FaCog, FaVuejs } from 'react-icons/fa';
import { 
  SiMongodb, SiExpress, 
  SiFlask, SiMysql, SiSpringboot, SiCplusplus, SiHtml5, SiCss3, SiReact, SiBootstrap, SiTailwindcss, SiPostman, SiVercel, SiRender, SiGithubcopilot
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Java", icon: FaJava, color: "text-red-600" },
        { name: "JavaScript", icon: FaJs, color: "text-yellow-500" },
        { name: "C/C++", icon: SiCplusplus, color: "text-blue-600" },
        { name: "Python", icon: FaPython, color: "text-blue-500" },
        { name: "PHP", icon: FaPhp, color: "text-purple-600" },
        { name: "HTML", icon: SiHtml5, color: "text-red-600" },
        { name: "CSS", icon: SiCss3, color: "text-purple-600" },
      ]
    },
    {
      title: "Frameworks",
      skills: [
        { name: "Node.js", icon: FaNode, color: "text-green-600" },
        { name: "Express.js", icon: SiExpress, color: "text-gray-600 dark:text-white" },
        { name: "React", icon: SiReact, color: "text-blue-500" },
        { name: "Flask", icon: SiFlask, color: "text-gray-700 dark:text-white" },
        { name: "Spring Boot", icon: SiSpringboot, color: "text-green-600" },
        { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-600" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-blue-600" },
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
        { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
        { name: "MS SQL Server", icon: FaCloud, color: "text-red-600" },
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "GitHub", icon: FaGithub, color: "text-gray-800 dark:text-white" },
        { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
        { name: "Postman", icon: SiPostman, color: "text-orange-600" },
        { name: "Vercel", icon: SiVercel, color: "text-gray-800 dark:text-white" },
        { name: "Render", icon: SiRender, color: "text-gray-800 dark:text-white" },
      ]
    },
    {
      title: "Other Technologies",
      skills: [
        { name: "Groq SDK", icon: FaCog, color: "text-gray-600 dark:text-white" },
        { name: "Vue", icon: FaVuejs, color: "text-green-600" },
        { name: "Copilot", icon: SiGithubcopilot, color: "text-blue-600" }
      ]
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to build amazing backend solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 card-hover transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <skill.icon className={`text-4xl mb-2 ${skill.color} tech-icon`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Proficiency Levels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Backend Development", level: 85 },
              { name: "Database Design", level: 75 },
              { name: "API Development", level: 98 },
              { name: "Cloud Services", level: 60 },
              { name: "DevOps", level: 70 },
              { name: "System Architecture", level: 90 },
            ].map((skill, index) => (
              <div key={skill.name} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">{skill.name}</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
