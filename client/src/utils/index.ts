import axios from 'axios';
import ms from 'ms';

export const timeAgo = (
  timestamp: Date | null,
  {
    withAgo
  }: {
    withAgo?: boolean;
  } = {}
): string => {
  if (!timestamp) return 'Never';
  const diff = Date.now() - new Date(timestamp).getTime();
  if (diff < 1000) {
    // less than 1 second
    return 'Just now';
  } else if (diff > 82800000) {
    // more than 23 hours – similar to how Twitter displays timestamps
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: new Date(timestamp).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  }
  return `${ms(diff)}${withAgo ? ' ago' : ''}`;
};

export const version = 'v1';
export const baseURL =
  process.env.NODE_ENV === 'production' ? 'http://localhost:8000/api' : 'http://localhost:8000/api';

export const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json', charset: 'utf-8' }
});

// TODO: we need to set token one time
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (config.headers && token) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});
