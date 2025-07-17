import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectsAPI = {
  getAll: () => api.get('/api/projects'),
  create: (projectData) => api.post('/api/projects', projectData),
  update: (id, projectData) => api.put(`/api/projects/${id}`, projectData),
  delete: (id) => api.delete(`/api/projects/${id}`)
};

export const experiencesAPI = {
  getAll: () => api.get('/api/experiences'),
  create: (experienceData) => api.post('/api/experiences', experienceData),
  update: (id, experienceData) => api.put(`/api/experiences/${id}`, experienceData),
  delete: (id) => api.delete(`/api/experiences/${id}`)
};

export const certificationsAPI = {
  getAll: () => api.get('/api/certifications'),
  create: (certificationData) => api.post('/api/certifications', certificationData),
  update: (id, certificationData) => api.put(`/api/certifications/${id}`, certificationData),
  delete: (id) => api.delete(`/api/certifications/${id}`)
};

export const contactAPI = {
  send: (contactData) => api.post('/api/contact', contactData)
};

export default api;
