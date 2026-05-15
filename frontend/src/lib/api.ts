import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach the token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export interface JobRequest {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
}

export type CreateJobRequest = Omit<JobRequest, '_id' | 'createdAt' | 'status'>;

export const getJobs = async (category?: string, status?: string, search?: string, sortBy?: string, location?: string): Promise<JobRequest[]> => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (status) params.append('status', status);
  if (search) params.append('search', search);
  if (sortBy) params.append('sortBy', sortBy);
  if (location) params.append('location', location);
  
  const response = await api.get(`/jobs?${params.toString()}`);
  return response.data;
};

export const getJobById = async (id: string): Promise<JobRequest> => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (data: CreateJobRequest): Promise<JobRequest> => {
  const response = await api.post('/jobs', data);
  return response.data;
};

export const updateJobStatus = async (id: string, status: string): Promise<JobRequest> => {
  const response = await api.patch(`/jobs/${id}`, { status });
  return response.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await api.delete(`/jobs/${id}`);
};

export const register = async (email: string, password: string) => {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};
