import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaEdit, FaTrash, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { projectsAPI, experiencesAPI, certificationsAPI } from '../api/index.js';

const AdminPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = 'admin123'; // In production, use environment variables

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsResponse, expResponse, certResponse] = await Promise.all([
        projectsAPI.getAll(),
        experiencesAPI.getAll(),
        certificationsAPI.getAll()
      ]);
      setProjects(projectsResponse.data);
      setExperiences(expResponse.data);
      setCertifications(certResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleAddProject = () => {
    setEditingItem({
      id: Date.now(),
      category: '',
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      projectUrl: '',
      isNew: true
    });
  };

  const handleAddExperience = () => {
    setEditingItem({
      id: Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      technologies: [],
      achievements: [],
      isNew: true
    });
  };

  const handleAddCertification = () => {
    setEditingItem({
      id: Date.now(),
      name: '',
      organization: '',
      verificationUrl: '',
      description: '',
      skills: [],
      isNew: true
    });
  };

  const handleSaveItem = async (item) => {
    try {
      if (activeTab === 'projects') {
        if (item.isNew) {
          const response = await projectsAPI.create(item);
          setProjects(prev => [...prev, response.data]);
        } else {
          const response = await projectsAPI.update(item._id || item.id, item);
          setProjects(prev => prev.map(proj => (proj._id || proj.id) === (item._id || item.id) ? response.data : proj));
        }
      } else if (activeTab === 'experiences') {
        if (item.isNew) {
          const response = await experiencesAPI.create(item);
          setExperiences(prev => [...prev, response.data]);
        } else {
          const response = await experiencesAPI.update(item._id || item.id, item);
          setExperiences(prev => prev.map(exp => (exp._id || exp.id) === (item._id || item.id) ? response.data : exp));
        }
      } else {
        if (item.isNew) {
          const response = await certificationsAPI.create(item);
          setCertifications(prev => [...prev, response.data]);
        } else {
          const response = await certificationsAPI.update(item._id || item.id, item);
          setCertifications(prev => prev.map(cert => (cert._id || cert.id) === (item._id || item.id) ? response.data : cert));
        }
      }
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item. Please try again.');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      if (activeTab === 'projects') {
        await projectsAPI.delete(id);
        setProjects(prev => prev.filter(proj => (proj._id || proj.id) !== id));
      } else if (activeTab === 'experiences') {
        await experiencesAPI.delete(id);
        setExperiences(prev => prev.filter(exp => (exp._id || exp.id) !== id));
      } else {
        await certificationsAPI.delete(id);
        setCertifications(prev => prev.filter(cert => (cert._id || cert.id) !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg max-w-6xl w-full mx-4 h-5/6 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'experiences'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Experiences
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'certifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Certifications
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-full">
          {/* Add Button */}
          <div className="mb-6">
            <button
              onClick={
                activeTab === 'projects' ? handleAddProject :
                activeTab === 'experiences' ? handleAddExperience : 
                handleAddCertification
              }
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <FaPlus className="mr-2" />
              Add {
                activeTab === 'projects' ? 'Project' :
                activeTab === 'experiences' ? 'Experience' : 
                'Certification'
              }
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(activeTab === 'projects' ? projects : 
                activeTab === 'experiences' ? experiences : 
                certifications).map((item) => (
                <div key={item._id || item.id} className="bg-gray-50 rounded-lg p-4">{/* Rest of the item display */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">
                      {item.title || item.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item._id || item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {activeTab === 'projects' ? item.category : 
                     activeTab === 'experiences' ? item.company : 
                     item.organization}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.description}
                  </p>
                  {activeTab === 'projects' && item.technologies && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {item.technologies.map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === 'experiences' && (
                    <>
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {item.technologies.map((tech, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.achievements && item.achievements.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-700 mb-1">Key Achievements:</p>
                          <ul className="text-xs text-gray-600 list-disc list-inside">
                            {item.achievements.slice(0, 2).map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                            {item.achievements.length > 2 && (
                              <li className="text-gray-400">+{item.achievements.length - 2} more...</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'certifications' && item.skills && item.skills.length > 0 && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {item.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-5/6 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">
                    {editingItem.isNew ? 'Add' : 'Edit'} {
                      activeTab === 'projects' ? 'Project' :
                      activeTab === 'experiences' ? 'Experience' : 
                      'Certification'
                    }
                  </h3>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Edit Form */}
                <div className="space-y-4">
                  {activeTab === 'projects' ? (
                    <>
                      <input
                        type="text"
                        placeholder="Category"
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Project Description"
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="4"
                      />
                      <input
                        type="text"
                        placeholder="Technologies (comma-separated)"
                        value={Array.isArray(editingItem.technologies) ? editingItem.technologies.join(', ') : ''}
                        onChange={(e) => setEditingItem({...editingItem, technologies: e.target.value.split(',').map(t => t.trim())})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        placeholder="GitHub URL (optional)"
                        value={editingItem.githubUrl || ''}
                        onChange={(e) => setEditingItem({...editingItem, githubUrl: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        placeholder="Project URL (optional)"
                        value={editingItem.projectUrl || ''}
                        onChange={(e) => setEditingItem({...editingItem, projectUrl: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </>
                  ) : activeTab === 'experiences' ? (
                    <>
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={editingItem.company}
                        onChange={(e) => setEditingItem({...editingItem, company: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={editingItem.location}
                        onChange={(e) => setEditingItem({...editingItem, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Start Date"
                          value={editingItem.startDate}
                          onChange={(e) => setEditingItem({...editingItem, startDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="End Date"
                          value={editingItem.endDate}
                          onChange={(e) => setEditingItem({...editingItem, endDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <textarea
                        placeholder="Experience Description"
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="4"
                      />
                      <input
                        type="text"
                        placeholder="Technologies (comma-separated)"
                        value={Array.isArray(editingItem.technologies) ? editingItem.technologies.join(', ') : ''}
                        onChange={(e) => setEditingItem({...editingItem, technologies: e.target.value.split(',').map(t => t.trim())})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Achievements (one per line)"
                        value={Array.isArray(editingItem.achievements) ? editingItem.achievements.join('\n') : ''}
                        onChange={(e) => setEditingItem({...editingItem, achievements: e.target.value.split('\n').map(a => a.trim()).filter(a => a)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="4"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Certification Name"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Organization"
                        value={editingItem.organization}
                        onChange={(e) => setEditingItem({...editingItem, organization: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        placeholder="Verification URL (optional)"
                        value={editingItem.verificationUrl || ''}
                        onChange={(e) => setEditingItem({...editingItem, verificationUrl: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Certification Description"
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="4"
                      />
                      <input
                        type="text"
                        placeholder="Skills (comma-separated)"
                        value={Array.isArray(editingItem.skills) ? editingItem.skills.join(', ') : ''}
                        onChange={(e) => setEditingItem({...editingItem, skills: e.target.value.split(',').map(s => s.trim())})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </>
                  )}
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveItem(editingItem)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <FaSave className="mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPanel;
