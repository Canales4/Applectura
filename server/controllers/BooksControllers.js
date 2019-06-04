var db = require('../database/db');
var service = require('../Services/BookService')
class BooksControllers{

  booksUser(req,res){service.librosUsuarios(req,res);};

  booksIsbn(req,res){service.librosIsbn(req,res);};

  booksStatus(req, res){service.librosEstado(req,res);};

  booksFav(req, res){service.librosFavoritos(req,res);};

  books(){service.libros();};

}

module.exports = BooksControllers = new BooksControllers();
