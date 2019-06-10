var service = require('../Services/BookService')


class BooksControllers{

  booksUser(req,res){
    const { codUser } = req.params;
    var books = service.librosUsuarios(codUser,res);
  };

  booksIsbn(req,res){
    const { isbn } = req.params;
    var books = service.librosIsbn(isbn, res);
  };

  booksStatus(req, res){
    const { status } = req.body;
    const { pag } = req.body;
    const { codTitulo } = req.body;
    const { codUser } = req.body;
    const { autor } = req.body;
    var books = service.librosEstado(status, pag, codTitulo, codUser, autor, res);
  };

  booksFav(req, res){
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    var books = service.librosFavoritos(codLibro, codUsuario, res);
  };

  books(req, res){
    var books = service.libros(req, res);
  };
}

module.exports = BooksControllers = new BooksControllers();
