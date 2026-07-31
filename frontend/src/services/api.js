import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Auth APIs
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const getCurrentUser = () => api.get('/auth/me');

// Resume APIs
export const analyzeResume = (formData) => api.post('/resume/analyze', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const analyzeResumeText = (payload) => api.post('/resume/analyze', payload);

// Interview APIs
export const fetchNextQuestion = (payload) => api.post('/interview/next-question', payload);
export const finishInterview = (payload) => api.post('/interview/finish', payload);

// Coding APIs
export const fetchProblems = () => api.get('/coding/problems');
export const runCode = (payload) => api.post('/coding/run', payload);
export const getAIHint = (payload) => api.post('/coding/ai-hint', payload);
export const analyzeComplexity = (payload) => api.post('/coding/analyze-complexity', payload);

// Career APIs
export const fetchCareerRoadmap = (payload) => api.post('/career/roadmap', payload);

// Gamification APIs
export const fetchGamificationStats = () => api.get('/gamification/stats');

export default api;
