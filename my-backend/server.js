// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Simuler une base de données en mémoire
let books = [
  { _id: '1', title: 'Book 1', author: { firstName: 'Author', lastName: 'One' }, coverUri: 'http://example.com/cover1.jpg', genre: 'Science Fiction' },
  { _id: '2', title: 'Book 2', author: { firstName: 'Author', lastName: 'Two' }, coverUri: 'http://example.com/cover2.jpg', genre: 'Policier' }
];

// Routes API
app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b._id === req.params.id);
  res.json(book);
});

app.post('/books', (req, res) => {
  const newBook = { _id: Date.now().toString(), ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const index = books.findIndex(b => b._id === req.params.id);
  if (index !== -1) {
    books[index] = { _id: req.params.id, ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).send('Book not found');
  }
});

app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b._id === req.params.id);
  if (index !== -1) {
    books.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Book not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
