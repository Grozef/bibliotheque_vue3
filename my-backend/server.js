const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'books.json');

app.use(cors());
app.use(bodyParser.json());

const readBooksFromFile = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const writeBooksToFile = (books) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(books, null, 2));
};

// Routes API
app.get('/books', (req, res) => {
  const books = readBooksFromFile();
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const books = readBooksFromFile();
  const book = books.find(b => b._id === req.params.id);
  res.json(book || { error: 'Book not found' });
});

app.post('/books', (req, res) => {
  const books = readBooksFromFile();
  const newBook = { _id: Date.now().toString(), ...req.body };
  books.push(newBook);
  writeBooksToFile(books);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const books = readBooksFromFile();
  const index = books.findIndex(b => b._id === req.params.id);
  if (index !== -1) {
    books[index] = { _id: req.params.id, ...req.body };
    writeBooksToFile(books);
    res.json(books[index]);
  } else {
    res.status(404).send('Book not found');
  }
});

app.delete('/books/:id', (req, res) => {
  const books = readBooksFromFile();
  const index = books.findIndex(b => b._id === req.params.id);
  if (index !== -1) {
    books.splice(index, 1);
    writeBooksToFile(books);
    res.status(204).send();
  } else {
    res.status(404).send('Book not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
