const express = require('express');
const router = express.Router();

// In-memory books database
const books = {
  "1": {
    isbn: "1",
    title: "Node Fundamentals",
    author: "John Smith",
    reviews: "Good"
  },
  "2": {
    isbn: "2",
    title: "Express in Action",
    author: "Jane Doe",
    reviews: "Good"
  },
  "3": {
    isbn: "3",
    title: "Learning JavaScript",
    author: "John Smith",
    reviews: "Good"
  },
  "4": {
    isbn: "4",
    title: "REST API Design",
    author: "Emily Clark",
    reviews: "Average"
  },
  "5": {
    isbn: "5",
    title: "MongoDB Essentials",
    author: "Robert Brown",
    reviews: "Average"
  },
  "6": {
    isbn: "6",
    title: "Backend Development with Node",
    author: "Michael Lee",
    reviews: "Average"
  },
  "7": {
    isbn: "7",
    title: "Web Security Basics",
    author: "Anna White",
    reviews: "Bad"
  },
  "8": {
    isbn: "8",
    title: "Full Stack JavaScript",
    author: "David Green",
    reviews: "Bad"
  },
  "9": {
    isbn: "9",
    title: "Microservices Architecture",
    author: "Sophia Martin",
    reviews: "Bad"
  },
  "10": {
    isbn: "10",
    title: "Cloud Native Applications",
    author: "James Wilson",
    reviews: "Excellent"
  }
};
// Get all books
router.get('/books', async (req, res) => {
  res.json(books);
});

// Get book by ISBN
router.get('/books/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(books[isbn]);
});

// Get books by author
router.get('/books/author/:author', async (req, res) => {
  const author = req.params.author.toLowerCase();

  const result = Object.values(books).filter(
    book => book.author.toLowerCase() === author
  );

  res.json(result);
});

// Get books by title
router.get('/books/title/:title', async (req, res) => {
  const title = req.params.title.toLowerCase();

  const result = Object.values(books).filter(
    book => book.title.toLowerCase() === title
  );

  res.json(result);
});

// Get book reviews
router.get('/books/review/:isbn', async (req, res) => {
  const book = books[req.params.isbn];

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book.reviews);
});

module.exports = {
  router,
  books
};