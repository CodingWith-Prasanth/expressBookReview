const express = require('express');
const jwt = require('jsonwebtoken');

const { books } = require('./general');

const router = express.Router();

const users = [];
const SECRET = 'bookreview-secret';

// Authentication middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing token' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const exists = users.find(u => u.username === username);

  if (exists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  users.push({ username, password });

  res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

// Add or update a review
router.put('/books/review/:isbn', authenticate, async (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;

  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  book.reviews[req.user.username] = review;

  res.json({
    message: 'Review added/updated successfully',
    reviews: book.reviews
  });
});

// Delete a review
router.delete('/books/review/:isbn', authenticate, async (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (!book.reviews[req.user.username]) {
    return res.status(404).json({ message: 'Review not found for this user' });
  }

  delete book.reviews[req.user.username];

  res.json({ message: 'Review deleted successfully' });
});

module.exports = router;