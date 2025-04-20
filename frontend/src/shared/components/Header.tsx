import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-slate-800 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div>
          <Link to="/" className="text-white text-xl font-bold">
            GoalSetter
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <li>
                <button 
                  onClick={onLogout}
                  className="text-white hover:text-slate-300"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-slate-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-white hover:text-slate-300">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 