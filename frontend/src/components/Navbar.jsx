import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut } from 'lucide-react';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <BookOpen size={28} color="#60a5fa" />
        Library MS
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
