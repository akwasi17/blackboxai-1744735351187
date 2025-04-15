import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaRobot, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaRobot className="w-8 h-8" />
            <span className="text-xl font-bold">Crime Report Bot</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => document.querySelector('.chatbot-trigger')?.click()}
                  className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-50 transition-colors"
                >
                  Open Assistant
                </button>
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-blue-500">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border-2 border-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border-2 border-white rounded hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-50 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
