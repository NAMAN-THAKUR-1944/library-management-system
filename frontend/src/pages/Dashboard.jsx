import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Book, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      if (user.role === 'admin') {
        const [statsRes, transRes] = await Promise.all([
          api.get('/stats'),
          api.get('/transactions')
        ]);
        setStats(statsRes.data);
        setTransactions(transRes.data);
      } else {
        const transRes = await api.get('/transactions/my');
        setTransactions(transRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReturn = async (id) => {
    try {
      await api.post(`/transactions/return/${id}`);
      fetchData();
    } catch (err) {
      alert('Error returning book');
    }
  };

  if (!user) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}</h2>

      {user.role === 'admin' && stats && (
        <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
          <div className="card glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Books</p>
                <h3 style={{ fontSize: '2rem' }}>{stats.totalBooks}</h3>
              </div>
              <Book size={32} color="#3b82f6" />
            </div>
          </div>
          <div className="card glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Issued Books</p>
                <h3 style={{ fontSize: '2rem' }}>{stats.issuedBooks}</h3>
              </div>
              <CheckCircle size={32} color="#10b981" />
            </div>
          </div>
          <div className="card glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Overdue Books</p>
                <h3 style={{ fontSize: '2rem' }}>{stats.overdueTransactions}</h3>
              </div>
              <AlertCircle size={32} color="#ef4444" />
            </div>
          </div>
        </div>
      )}

      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        {user.role === 'admin' ? 'Recent Transactions' : 'My Issued Books'}
      </h3>
      
      <div className="glass" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid var(--border)' }}>
            <tr>
              <th style={{ padding: '1rem' }}>Book</th>
              {user.role === 'admin' && <th style={{ padding: '1rem' }}>Student</th>}
              <th style={{ padding: '1rem' }}>Issue Date</th>
              <th style={{ padding: '1rem' }}>Due Date</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Fine</th>
              {user.role === 'student' && <th style={{ padding: '1rem' }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }}>{t.Book?.title}</td>
                {user.role === 'admin' && <td style={{ padding: '1rem' }}>{t.User?.username}</td>}
                <td style={{ padding: '1rem' }}>{new Date(t.issueDate).toLocaleDateString()}</td>
                <td style={{ padding: '1rem', color: new Date(t.dueDate) < new Date() && t.status === 'issued' ? 'var(--danger)' : 'inherit' }}>
                  {new Date(t.dueDate).toLocaleDateString()}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span className={`badge ${t.status === 'returned' ? 'badge-success' : 'badge-danger'}`}>
                    {t.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>${t.fine}</td>
                {user.role === 'student' && (
                  <td style={{ padding: '1rem' }}>
                    {t.status === 'issued' && (
                      <button onClick={() => handleReturn(t.id)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                        Return Book
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="100%" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
