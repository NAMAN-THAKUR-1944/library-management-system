import { useState, useEffect } from 'react';
import api from '../api';
import { Search, Plus } from 'lucide-react';

const Books = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', category: '' });

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = async () => {
    try {
      const { data } = await api.get(`/books?query=${search}`);
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIssue = async (bookId) => {
    if (!user) {
      alert('Please log in to issue books');
      return;
    }
    try {
      await api.post('/transactions/issue', { bookId });
      fetchBooks();
      alert('Book issued successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error issuing book');
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', newBook);
      setNewBook({ title: '', author: '', category: '' });
      setShowAdd(false);
      fetchBooks();
    } catch (err) {
      alert('Error adding book');
    }
  };

  const handleDelete = async (bookId) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      await api.delete(`/books/${bookId}`);
      fetchBooks();
    } catch (err) {
      alert('Error deleting book');
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem' }}>Library Catalog</h2>
        {user?.role === 'admin' && (
          <button onClick={() => setShowAdd(!showAdd)} className="btn btn-primary">
            <Plus size={18} /> Add Book
          </button>
        )}
      </div>

      <div style={{ position: 'relative', marginBottom: '2rem', maxWidth: '500px' }}>
        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search by title, author, or category..." 
          className="form-control" 
          style={{ paddingLeft: '3rem' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {showAdd && user?.role === 'admin' && (
        <div className="card glass" style={{ marginBottom: '2rem', maxWidth: '600px' }}>
          <h3>Add New Book</h3>
          <form onSubmit={handleAddBook} className="grid grid-cols-2" style={{ gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input type="text" placeholder="Title" className="form-control" required value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input type="text" placeholder="Author" className="form-control" required value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input type="text" placeholder="Category" className="form-control" required value={newBook.category} onChange={e => setNewBook({...newBook, category: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-success" style={{ background: 'var(--success)', color: 'white' }}>Save Book</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-4">
        {books.map(book => (
          <div key={book.id} className="card glass" style={{ justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{book.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>By {book.author}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>{book.category}</p>
              
              <span className={`badge ${book.available ? 'badge-success' : 'badge-danger'}`}>
                {book.available ? 'Available' : 'Issued'}
              </span>
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
              {user?.role === 'student' && book.available && (
                <button onClick={() => handleIssue(book.id)} className="btn btn-primary" style={{ width: '100%' }}>Issue Book</button>
              )}
              {user?.role === 'admin' && (
                <button onClick={() => handleDelete(book.id)} className="btn btn-danger" style={{ width: '100%' }}>Delete Book</button>
              )}
            </div>
          </div>
        ))}
        {books.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            No books found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
