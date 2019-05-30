var express = require('express');
var book = express.Router();

var controlador = require('../controllers/BooksController');

book.get('/books/:codUser', controlador.booksUser );

book.get('/books/isbn/:isbn', controlador.booksIsbn );

book.put('/books/status', controlador.booksStatus );

book.post('/book/fav', controlador.booksFav );

book.post('/books', controlador.books );

module.exports = book;
