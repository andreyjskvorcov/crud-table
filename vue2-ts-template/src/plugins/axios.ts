import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // замени на свой API
  timeout: 5000,
});

export default api;