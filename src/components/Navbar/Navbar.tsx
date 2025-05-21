import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/useAuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthContext();

  // Function to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path ? 'navbar-link active' : 'navbar-link';
  };

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className={isActive('/')}>Inicio</Link>
        </li>
        <li className="navbar-item">
          <Link to="/feed" className={isActive('/feed')}>Feed</Link>
        </li>
        <li className="navbar-item">
          <Link to="/posts/create" className={isActive('/posts/create')}>Create Post</Link>
        </li>
        <li className="navbar-item">
          <Link to="/users/register" className={isActive('/users/register')}>Register</Link>
        </li>
        <li className="navbar-item">
          <Link to="/users/edit" className={isActive('/users/edit')}>Edit Profile</Link>
        </li>
        <li className="navbar-item">
          <Link to="/users/favorites" className={isActive('/users/favorites')}>Favorites</Link>
        </li>
        <li className="navbar-item">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          ) : (
            <Link to="/login" className={isActive('/login')}>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
