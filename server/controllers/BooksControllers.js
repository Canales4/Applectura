var db = require('../database/db');

class BooksControllers{

  booksUser(req,res){
    const { codUser } = req.params;
    var books = mysqlConnection.query('SELECT T.titulo, T.ISBN, T.genero, T.anoPublicacion, T.portada, T.paginas, T.descripcion, T.editorial, T.idioma, A.nomAutor, Le.estado,  L.codLibro FROM titulo T JOIN libros L ON (T.codTitulo = L.codTitulo) JOIN autor A ON (L.codAutor = A.codAutor) JOIN lecturas Le ON (L.codLibro = Le.codLibro) WHERE Le.codUsuario = ?',[codUser] , (err, rows) => {
        if (err) console.log(err);
        res.json(rows);
    });
  };

  booksIsbn(req,res){
    const { isbn } = req.params;
    const { codUser } = req.params;
    var books = mysqlConnection.query('SELECT t.codTitulo, t.ISBN, t.titulo, t.genero, t.anoPublicacion, t.portada, t.paginas, t.descripcion, t.editorial, t.idioma, l.codLibro, le.estado, le.pagLec, a.codAutor, a.nomAutor FROM titulo t, libros l, autor a, lecturas le WHERE t.codTitulo = l.codTitulo AND l.codAutor = a.codAutor AND l.codLibro = le.codLibro AND t.ISBN = ?', [isbn], (err, rows) => {
        if (err) console.log(err);
        res.json(rows);
    });
  };

  booksStatus(req, res){
    const { status } = req.body;
    const { pag } = req.body;
    const { codTitulo } = req.body;
    const { codUser } = req.body;
    const { author } = req.body;
    mysqlConnection.query('SELECT codAutor FROM autor WHERE nomAutor = ?', [author], (err, rows) => {
        if (err) console.log(err);
        const autor = rows[0].codAutor;
        mysqlConnection.query('SELECT codLibro FROM libros WHERE codAutor = ? AND codTitulo = ?', [autor, codTitulo], (err, rows) => {
            if (err) console.log(err);
            const libro = rows[0].codLibro;
            mysqlConnection.query('UPDATE lecturas SET estado = ?, pagLec = ? WHERE codLibro = ? AND codUsuario = ?', [status, pag, libro, codUser], (err, rows) => {
                if (err) console.log(err);
            });
        });
    });
  };

  booksFav(req, res){
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    mysqlConnection.query('INSERT INTO favoritos (codLibro, codUsuario) VALUES (?, ?)', [codLibro, codUsuario], (err, rows) => {
        if (err) console.log(err);
    });
  };

  books(){
    const {codUser} = req.body;
    var {isbn} = req.body;
    const {titulo} = req.body;
    const {genero} = req.body;
    const {anoPublicacion} = req.body;
    const {portada} = req.body;
    const {paginas} = req.body;
    const {descripcion} = req.body;
    const {estado} = req.body;
    const {editorial} = req.body;
    const {idioma} = req.body;
    const {autor} = req.body;
    var cont = 0;
    var listAut = [];
    var idAut = 0;
    var idTit = 0;
    var codLib = 0;
    var lecturas = true;

    isbn = isbn.toString();

    mysqlConnection.query("SELECT codTitulo FROM titulo WHERE ISBN IN (?)", [isbn], (err, rows) => {
        if (err) console.log(err);
        if(rows.length == 0) {
            tituloCheck();
        } else {
            lecturas = false;
            authorCheck();
        }
    });

    function authorCheck() {
        mysqlConnection.query("SELECT codAutor FROM autor WHERE nomAutor IN (?)", [autor], (err, rows) => {
            if (err) console.log(err);
            if(rows.length == 0) {
                mysqlConnection.query("INSERT INTO autor (nomAutor) VALUES ( ? )", [autor], (err, rows) => {
                    if (err) console.log(err);
                });
            }
            if (lecturas) {
                selects();
            } else {
                selectLibro();
            }
        });
    }

    function tituloCheck() {
        mysqlConnection.query("INSERT INTO titulo (ISBN, titulo, genero, portada, anoPublicacion, paginas, descripcion, editorial, idioma) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)", [isbn, titulo, genero, portada, anoPublicacion, paginas, descripcion, editorial, idioma], (err, rows) => {
            if (err) console.log(err);
            authorCheck()
        });
    }

    function selects() {
        mysqlConnection.query("SELECT codAutor FROM autor WHERE nomAutor = ?", [autor], (err, rows) => {
            if (err) console.log(err);
            idAut = rows[0].codAutor;
            mysqlConnection.query("SELECT codTitulo FROM titulo WHERE ISBN = ?", [isbn], (err, rows) => {
                if (err) console.log(err);
                if(rows[0]) {
                    idTit = rows[0].codTitulo;
                    insertLibro();
                } else {
                    mysqlConnection.query("SELECT codTitulo FROM titulo WHERE titulo = ?", [titulo], (err, rows) => {
                        idTit = rows[0].codTitulo
                        insertLibro();
                    });
                }
            });
        });
    }

    function selectLibro() {
        mysqlConnection.query("SELECT codTitulo FROM titulo WHERE ISBN = ?", [isbn], (err, rows) => {
            if (err) console.log(err);
            if(rows[0]) {
                idTit = rows[0].codTitulo;
            } else {
                mysqlConnection.query("SELECT codTitulo FROM titulo WHERE titulo = ?", [titulo], (err, rows) => {
                    idTit = rows[0].codTitulo
                });
            }
            mysqlConnection.query("SELECT codLibro FROM libros WHERE codTitulo = ?", [idTit], (err, rows) => {
                if (err) console.log(err);
                codLib = rows[0].codLibro;
                insertLecturas();
            });
        });
    }

    function insertLibro() {
        mysqlConnection.query("INSERT INTO libros (codAutor, codTitulo) VALUES ( ?, ?)", [idAut, idTit], (err, rows) => {
            if (err) console.log(err);
            selectLibro();
        });
    }

    function insertLecturas() {
        mysqlConnection.query("INSERT INTO lecturas (codUsuario, codLibro, estado) VALUES ( ?, ?, ?)", [codUser, codLib, estado], (err, rows) => {
            if (err) console.log(err);
        });
    }
  };
}

module.exports = BooksControllers = new BooksControllers();
