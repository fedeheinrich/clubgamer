import axios from 'axios';

// Vite usa import.meta.env en lugar de process.env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
});

export default api;