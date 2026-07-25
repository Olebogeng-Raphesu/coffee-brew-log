import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const getBrews = (method) => 
  api.get('/brews', { params: method ? { method } : {} });

export const getBrew = (id) => api.get(`/brews/${id}`);
export const createBrew = (data) => api.post('/brews', data);
export const updateBrew = (id, data) => api.put(`/brews/${id}`, data);
export const deleteBrew = (id) => api.delete(`/brews/${id}`);