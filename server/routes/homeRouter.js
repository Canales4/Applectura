var express = require('express');
var router = express.Router();
var mysqlConnection = require('../database/db');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/home');
    res.send('Works!');
});

router.get('/home', function(req, res, next) {
    res.send('Works!');
});

router.get('/home/search', function(req, res, next) {
    res.send('Works!');
});

router.get('/books/rating', (req, res, next) => {
    var books = mysqlConnection.query('', (err, rows) => {
        if (err) console.log(err);
    });
});

// BUSQUEDA DE LIBRO CON MAYOR PUNTUACIÓN 

router.get('/bestbook', (req, res, next)=>{
  mysqlConnection.query('SELECT * FROM titulo T RIGHT JOIN libros L ON(T.codTitulo = L.codTitulo)WHERE puntuacion=(SELECT MAX(puntuacion) FROM libros)', (err, rows, next) =>{
    if (err) console.log(err);
    res.json(rows);
  });
});

router.get('/iconHome/:codUsuario', (req, res, next)=>{
  const { codUsuario } = req.params;
  mysqlConnection.query('SELECT icono FROM usuario WHERE codUsuario = ?',[codUsuario], (err, rows, next) =>{
    if (err) console.log(err);
    res.json(rows);
  });
});

router.get('/newClub', (req, res, next)=>{
  mysqlConnection.query('SELECT nomClub AS NombreClub, desClub AS DescripcionClub, icono, codClub FROM club WHERE codClub=(SELECT MAX(codClub) FROM club)', (err, rows, next) =>{
    if (err) console.log(err);
    res.json(rows);
  });
});

router.get('/lastBookAdd', (req, res, next)=>{
  mysqlConnection.query('SELECT * FROM titulo T JOIN libros L ON(T.codTitulo=L.codTitulo)where L.codLibro=(SELECT MAX(codLibro)FROM libros)', (err, rows, next) =>{
    if (err) console.log(err);
    res.json(rows);
  });
});

router.get('/mostRead', (req, res, next)=>{
  mysqlConnection.query('SELECT titulo, portada, COUNT(estado) AS vecesLeido FROM titulo T JOIN libros L ON(T.codTitulo=L.codTitulo) JOIN lecturas LE ON(L.codLibro=LE.codLibro)where estado like "leido" GROUP by titulo ORDER BY 3 DESC LIMIT 5', (err, rows, next) =>{
    if (err) console.log(err);
    res.json(rows);
  });
});

// BUSCAR USUARIO

router.get('/searchUser/:termino', (req, res, next)=>{
  const termino = `${req.params.termino}%`;
  console.log(termino);
  mysqlConnection.query('SELECT nomUsuario AS nombre, icono FROM usuario where nomUsuario LIKE ?', [termino], (err, rows, next) =>{
    if (err) console.log(err);
    console.log(rows);
    res.json(rows);
  });
});

//Añadir libros a la BBDD a la table de favoritos

router.post('/favoritos', (req, res, next)=>{
//Creo las constantes para poder utilizarlas luego, otra forma sería const codLibro = req.body.codLibro
  const { codLibro } = req.body;
  const { codUsuario } = req.body;
  //Hago la query con el insert de lo que quiero
  mysqlConnection.query('INSERT into favoritos (codLibro, codUsuario) values (?, ?)',[codLibro, codUsuario] , (err, rows, next) =>{
    if (err) console.log(err);
    res.json(rows);
  });
});

router.post('/deleteFavorito', (req, res, next)=>{
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    mysqlConnection.query('DELETE FROM favoritos WHERE codLibro = ? and codUsuario = ?',[codLibro, codUsuario] , (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
    });
  });

  router.post('/consultaFavorito', (req, res, next)=>{
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    mysqlConnection.query('SELECT codFavoritos FROM favoritos WHERE codLibro = ? and codUsuario = ?',[codLibro, codUsuario] , (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
      console.log(rows);
        });
  });

  router.get('/lastFavoriteISBN/:cod', (req, res, next)=>{
    const { cod } = req.params;
    console.log('Eeste es mi codigo usuario ' + cod);
    mysqlConnection.query('SELECT * FROM (favoritos F JOIN libros L ON (F.codLibro=L.codLibro))JOIN titulo T ON (L.codTitulo=T.codTitulo) where codFavoritos=(SELECT MAX(codFavoritos)FROM favoritos where codUsuario = ?)', [cod], (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
      // console.log('Estas son las filas ' + rows);
    });
  });

module.exports = router;