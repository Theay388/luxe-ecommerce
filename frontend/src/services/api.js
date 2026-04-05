import axios from 'axios';
import MockApi, { mockProducts, mockUsers, mockOrders } from './mockData';

const USE_MOCK = true;
const mock = new MockApi();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('luxe_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('luxe_token');
      localStorage.removeItem('luxe_user');
    }
    
    if (USE_MOCK && err.code === 'ECONNREFUSED') {
      console.log('Backend unavailable, using mock data');
      return handleMockRequest(err.config);
    }
    
    return Promise.reject(err);
  }
);

async function handleMockRequest(config) {
  const url = config.url || '';
  const method = config.method?.toUpperCase() || 'GET';
  const data = config.data ? JSON.parse(config.data) : {};

  if (method === 'GET') {
    const result = await mock.get(url);
    return { data: result.data, status: 200 };
  }
  if (method === 'POST') {
    const result = await mock.post(url, data);
    return { data: result.data, status: 200 };
  }
  if (method === 'PUT') {
    const result = await mock.put(url, data);
    return { data: result.data, status: 200 };
  }
  if (method === 'DELETE') {
    const result = await mock.delete(url);
    return { data: result.data, status: 200 };
  }
  
  return Promise.reject({ response: { status: 404, data: { message: 'Not found' } } });
}

api.get = async (url, config) => {
  if (USE_MOCK) {
    try {
      const result = await mock.get(url);
      return { data: result.data };
    } catch (err) {
      throw { response: { status: 404, data: err } };
    }
  }
  return axios.get(url, config);
};

api.post = async (url, data, config) => {
  if (USE_MOCK) {
    try {
      const result = await mock.post(url, data);
      return { data: result.data };
    } catch (err) {
      throw { response: { status: 400, data: err } };
    }
  }
  return axios.post(url, data, config);
};

api.put = async (url, data, config) => {
  if (USE_MOCK) {
    try {
      const result = await mock.put(url, data);
      return { data: result.data };
    } catch (err) {
      throw { response: { status: 400, data: err } };
    }
  }
  return axios.put(url, data, config);
};

api.delete = async (url, config) => {
  if (USE_MOCK) {
    try {
      const result = await mock.delete(url);
      return { data: result.data };
    } catch (err) {
      throw { response: { status: 400, data: err } };
    }
  }
  return axios.delete(url, config);
};

export { mockProducts, mockUsers, mockOrders };
export default api;
