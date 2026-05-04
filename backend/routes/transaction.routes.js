const express = require('express');
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Student: Issue a book
router.post('/issue', authenticate, async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findByPk(bookId);
    if (!book || !book.available) {
      return res.status(400).json({ message: 'Book is not available' });
    }

    // Set due date to 14 days from now
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const transaction = await Transaction.create({
      userId: req.user.id,
      bookId,
      dueDate
    });

    await book.update({ available: false });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Student: Return a book
router.post('/return/:id', authenticate, async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction || transaction.status === 'returned') {
      return res.status(400).json({ message: 'Invalid transaction' });
    }

    const returnDate = new Date();
    let fine = 0;
    
    // Calculate fine: 10 units per day late
    if (returnDate > new Date(transaction.dueDate)) {
      const diffTime = Math.abs(returnDate - new Date(transaction.dueDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      fine = diffDays * 10;
    }

    await transaction.update({
      returnDate,
      status: 'returned',
      fine
    });

    const book = await Book.findByPk(transaction.bookId);
    if (book) {
      await book.update({ available: true });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's transactions
router.get('/my', authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
      include: [Book]
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all transactions
router.get('/', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [Book, require('../models/User')]
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
