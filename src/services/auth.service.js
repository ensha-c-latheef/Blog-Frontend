import axios from 'axios';

class AuthService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL
      // We set our API's base URL so that all requests use the same base URL
    });

      // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = ({ email, password }) => {
    return this.api.post('/auth/login', { email, password });
  };

  signup = ({ name, email, password}) => {
    return this.api.post('/auth/signup', { name, email, password});
  };

  verify = (headers) => {
    return this.api.get('/auth/verify', { headers });
  };
}

// Create one instance object
const authService = new AuthService();

export default authService;