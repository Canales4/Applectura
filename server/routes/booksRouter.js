var express = require('express');
var book = express.Router();

var controlador = require('../controllers/BooksControllers');

book.get('/:codUser', controlador.booksUser );

book.get('/isbn/:isbn', controlador.booksIsbn );

book.put('/status', controlador.booksStatus );

book.post('/fav', controlador.booksFav );

book.post('/all', controlador.books );

module.exports = book;
