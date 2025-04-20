import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../features/auth/components/LoginForm';
import { useAuth } from '../features/auth/hooks/useAuth';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-gray-600 mt-2">Login to access your goals</p>
      </div>
      
      <LoginForm />
      
      <div className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:text-blue-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login; 