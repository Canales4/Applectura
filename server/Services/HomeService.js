var db = require('../database/db');

class HomeService {
    raiz(res){
      res.redirect('/home');
    };

    casa(res){
      res.send('Works!');
    };

    mejorLibro(res){
      db.query('SELECT * FROM titulo T RIGHT JOIN libros L ON(T.codTitulo = L.codTitulo)WHERE puntuacion=(SELECT MAX(puntuacion) FROM libros)', (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
      });
    };

    iconoCasa(codUsuario, res){
      db.query('SELECT icono FROM usuario WHERE codUsuario = ?',[codUsuario], (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
      });
    };

    nuevoClub(res){
      db.query('SELECT nomClub AS NombreClub, desClub AS DescripcionClub, icono, codClub FROM club WHERE codClub=(SELECT MAX(codClub) FROM club)', (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
      });
    };

    ultimoLibroAniadido(res){
      db.query('SELECT * FROM titulo T JOIN libros L ON(T.codTitulo=L.codTitulo)where L.codLibro=(SELECT MAX(codLibro)FROM libros)', (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
      });
    };

    masLeido(res){
      db.query('SELECT titulo, portada, COUNT(estado) AS vecesLeido FROM titulo T JOIN libros L ON(T.codTitulo=L.codTitulo) JOIN lecturas LE ON(L.codLibro=LE.codLibro)where estado like "leido" GROUP by titulo ORDER BY 3 DESC LIMIT 5', (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
      });
    };

    buscaUsuario(termino, res){
      db.query('SELECT nomUsuario AS nombre, icono FROM usuario where nomUsuario LIKE ?', [termino], (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
      });
    };

    fav(codLibro, codUsario, res){
      db.query('INSERT into favoritos (codLibro, codUsuario) values (?, ?)',[codLibro, codUsuario] , (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
      });
    };

    borraFav(codLibro, codUsuario, res){
      db.query('DELETE FROM favoritos WHERE codLibro = ? and codUsuario = ?',[codLibro, codUsuario] , (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
      });
    };

    consultaFav(codLibro, codUsuario, res){
      db.query('SELECT codFavoritos FROM favoritos WHERE codLibro = ? and codUsuario = ?',[codLibro, codUsuario] , (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
        console.log(rows);
      });
    };

    ultimoFavIsbn(cod, res){
      db.query('SELECT * FROM (favoritos F JOIN libros L ON (F.codLibro=L.codLibro))JOIN titulo T ON (L.codTitulo=T.codTitulo) where codFavoritos=(SELECT MAX(codFavoritos)FROM favoritos where codUsuario = ?)', [cod], (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
      });
    };
}

module.exports = HomeService = new HomeService();
