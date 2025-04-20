import axios from 'axios';

// Define types
export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends UserCredentials {
  name: string;
}

// API URL
const API_URL = '/api/users/';

// Register user
const register = async (userData: RegisterData): Promise<User> => {
  const response = await axios.post<User>(API_URL, userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// Login user
const login = async (userData: UserCredentials): Promise<User> => {
  const response = await axios.post<User>(API_URL + 'login', userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// Logout user
const logout = (): void => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService; 