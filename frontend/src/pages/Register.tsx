import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../features/auth/components/RegisterForm';
import { useAuth } from '../features/auth/hooks/useAuth';

const Register = () => {
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
        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
        <p className="text-gray-600 mt-2">Register to start setting goals</p>
      </div>
      
      <RegisterForm />
      
      <div className="mt-4 text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register; 