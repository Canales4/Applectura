var db = require('../database/db');

class HomeControllers {
  bestBook(req,res){
    mysqlConnection.query('SELECT * FROM titulo T RIGHT JOIN libros L ON(T.codTitulo = L.codTitulo)WHERE puntuacion=(SELECT MAX(puntuacion) FROM libros)', (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
    });
  };

  iconHome(req,res){
    const { codUsuario } = req.params;
    mysqlConnection.query('SELECT icono FROM usuario WHERE codUsuario = ?',[codUsuario], (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
    });
  };

  newClub(req,res){
    mysqlConnection.query('SELECT nomClub AS NombreClub, desClub AS DescripcionClub, icono, codClub FROM club WHERE codClub=(SELECT MAX(codClub) FROM club)', (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
    });
  };

  lastBookAdd(req,res){
    mysqlConnection.query('SELECT * FROM titulo T JOIN libros L ON(T.codTitulo=L.codTitulo)where L.codLibro=(SELECT MAX(codLibro)FROM libros)', (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
    });
  };

  mostRead(req,res){
    mysqlConnection.query('SELECT titulo, portada, COUNT(estado) AS vecesLeido FROM titulo T JOIN libros L ON(T.codTitulo=L.codTitulo) JOIN lecturas LE ON(L.codLibro=LE.codLibro)where estado like "leido" GROUP by titulo ORDER BY 3 DESC LIMIT 5', (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
    });
  };

  searchUser(req,res){
    const termino = `${req.params.termino}%`;
    console.log(termino);
    mysqlConnection.query('SELECT nomUsuario AS nombre, icono FROM usuario where nomUsuario LIKE ?', [termino], (err, rows, next) =>{
      if (err) console.log(err);
      console.log(rows);
      res.json(rows);
    });
  };

  favoritos(req,res){
    //Creo las constantes para poder utilizarlas luego, otra forma sería const codLibro = req.body.codLibro
      const { codLibro } = req.body;
      const { codUsuario } = req.body;
      //Hago la query con el insert de lo que quiero
      mysqlConnection.query('INSERT into favoritos (codLibro, codUsuario) values (?, ?)',[codLibro, codUsuario] , (err, rows, next) =>{
        if (err) console.log(err);
        res.json(rows);
      });
  };

  deleteFavorito(req,res){
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    mysqlConnection.query('DELETE FROM favoritos WHERE codLibro = ? and codUsuario = ?',[codLibro, codUsuario] , (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
    });
  };

  consultaFavorito(req,res){
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    mysqlConnection.query('SELECT codFavoritos FROM favoritos WHERE codLibro = ? and codUsuario = ?',[codLibro, codUsuario] , (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
      console.log(rows);
    });
  };

  lastFavoriteISBN(req,res){
    const { cod } = req.params;
    console.log('Eeste es mi codigo usuario ' + cod);
    mysqlConnection.query('SELECT * FROM (favoritos F JOIN libros L ON (F.codLibro=L.codLibro))JOIN titulo T ON (L.codTitulo=T.codTitulo) where codFavoritos=(SELECT MAX(codFavoritos)FROM favoritos where codUsuario = ?)', [cod], (err, rows, next) =>{
      if (err) console.log(err);
      res.json(rows);
    });
  };
}

module.exports = HomeControllers = new HomeControllers();
