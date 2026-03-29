import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

const UserService = {
  // Register a new user
  registerUser: async (userData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    userType: string; 
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        ...userData,
        passwordHash: userData.password  // Map password to passwordHash
      });
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user data
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Login user
  loginUser: async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user data
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  logoutUser: () => {
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user") || "null");
  }
};

export default UserService;