import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import authService, { User, UserCredentials, RegisterData } from '../services/authService';

// Define the Auth Context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: UserCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for user in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login user
  const login = async (credentials: UserCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await authService.login(credentials);
      setUser(userData);
      toast.success('Login successful!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred during login';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Register user
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const registeredUser = await authService.register(userData);
      setUser(registeredUser);
      toast.success('Registration successful!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred during registration';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setUser(null);
    toast.info('Logged out successfully');
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Provide the auth context value to children
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 