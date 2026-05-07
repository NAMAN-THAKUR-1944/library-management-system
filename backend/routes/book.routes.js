const express = require('express');
const Book = require('../models/Book');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Get all books (can search by title/author/category and filter by category/availability)
router.get('/', async (req, res) => {
  try {
    const { query, category, availability } = req.query;
    let where = {};
    
    if (query) {
      where[Op.or] = [
        { title: { [Op.like]: `%${query}%` } },
        { author: { [Op.like]: `%${query}%` } }
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    if (availability !== undefined && availability !== '') {
      where.available = availability === 'true';
    }

    const books = await Book.findAll({ where });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Add a new book
router.post('/', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update a book
router.put('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    await book.update(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Delete a book
router.delete('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    await book.destroy();
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
