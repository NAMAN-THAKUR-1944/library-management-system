const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const User = require('./models/User');
const Book = require('./models/Book');
const Transaction = require('./models/Transaction');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/books', require('./routes/book.routes'));
app.use('/api/transactions', require('./routes/transaction.routes'));

// Admin Dashboard stats
app.get('/api/stats', async (req, res) => {
  try {
    const totalBooks = await Book.count();
    const issuedBooks = await Book.count({ where: { available: false } });
    
    const overdueTransactions = await Transaction.count({
      where: {
        status: 'issued',
        dueDate: {
          [require('sequelize').Op.lt]: new Date()
        }
      }
    });

    res.json({ totalBooks, issuedBooks, overdueTransactions });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  });
} else {
  // In production (e.g. Vercel), export the app for serverless function
  sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
  }).catch(console.error);
}

module.exports = app;
