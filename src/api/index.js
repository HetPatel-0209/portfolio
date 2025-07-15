import axios from 'axios';

// Create axios instance with base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints for projects
export const projectsAPI = {
  // Get all projects
  getAll: () => api.get('/api/projects'),
  
  // Get project by ID
  getById: (id) => api.get(`/api/projects/${id}`),
  
  // Get projects by category
  getByCategory: (category) => api.get(`/api/projects/category/${category}`),
  
  // Create new project
  create: (projectData) => api.post('/api/projects', projectData),
  
  // Update project
  update: (id, projectData) => api.put(`/api/projects/${id}`, projectData),
  
  // Delete project
  delete: (id) => api.delete(`/api/projects/${id}`)
};

// API endpoints for experiences
export const experiencesAPI = {
  // Get all experiences
  getAll: () => api.get('/api/experiences'),
  
  // Get experience by ID
  getById: (id) => api.get(`/api/experiences/${id}`),
  
  // Create new experience
  create: (experienceData) => api.post('/api/experiences', experienceData),
  
  // Update experience
  update: (id, experienceData) => api.put(`/api/experiences/${id}`, experienceData),
  
  // Delete experience
  delete: (id) => api.delete(`/api/experiences/${id}`)
};

// API endpoints for certifications
export const certificationsAPI = {
  // Get all certifications
  getAll: () => api.get('/api/certifications'),
  
  // Get certification by ID
  getById: (id) => api.get(`/api/certifications/${id}`),
  
  // Create new certification
  create: (certificationData) => api.post('/api/certifications', certificationData),
  
  // Update certification
  update: (id, certificationData) => api.put(`/api/certifications/${id}`, certificationData),
  
  // Delete certification
  delete: (id) => api.delete(`/api/certifications/${id}`)
};

// Contact API
export const contactAPI = {
  send: (contactData) => api.post('/api/contact', contactData)
};

export default api;
