import axios from 'axios';

class UsersService {
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

  getUserDetails = () => {
    return this.api.get('/users');
  };

  editUserDetails = ({ name,  phoneNumber }) => {
    return this.api.put('/users', { name, phoneNumber });
  };

}

// Create one instance object
const usersService = new UsersService();

export default usersService;

