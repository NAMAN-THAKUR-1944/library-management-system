import { Link } from 'react-router-dom';
import { BookMarked, Users, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 800, background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        Welcome to the Future of Library Management
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
        A premium, modern, and intelligent library management system designed to make issuing and managing books seamless for everyone.
      </p>

      <div className="grid grid-cols-3" style={{ marginBottom: '4rem' }}>
        <div className="card glass" style={{ alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '1rem', borderRadius: '50%' }}>
            <BookMarked size={32} color="#60a5fa" />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Extensive Catalog</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Browse thousands of books across multiple categories.</p>
        </div>
        <div className="card glass" style={{ alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '1rem', borderRadius: '50%' }}>
            <Clock size={32} color="#c084fc" />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Automated Tracking</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Never miss a due date with automated fines and tracking.</p>
        </div>
        <div className="card glass" style={{ alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '50%' }}>
            <Users size={32} color="#34d399" />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Dual Roles</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Dedicated dashboards for both Admins and Students.</p>
        </div>
      </div>

      <Link to="/books" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '99px' }}>
        Explore Catalog
      </Link>
    </div>
  );
};

export default Home;
