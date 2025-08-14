import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api' }); // same port as backend

export default API;
