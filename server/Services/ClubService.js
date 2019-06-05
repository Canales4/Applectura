var db = require('../database/db');

class ClubService {

  listar(termino, res){
    var list = db.query('SELECT * FROM club WHERE nomClub LIKE ?', [termino], (err, rows, fields) => {
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ text: 'El club no existe' });
        }
        console.log(rows);
    })
  };

  listarClubUsuario(idUser, res){
    var list = db.query('SELECT a.codClub, a.nomClub, a.presidente FROM club a LEFT JOIN socios b on (a.codClub = b.codClub) WHERE b.codUsuario = ? OR a.presidente = ? GROUP BY nomclub', [idUser, idUser], (err, rows, fields) => {
        if (err) console.log(err);
        res.json(rows);
    })
  };

  cogeUno(idClub, res){
    var list = db.query('SELECT * FROM club WHERE codClub = ?', [idClub], (err, rows, fields) => {
        if (rows.length > 0) { //si el club existe muestralo
            res.json(rows);
        } else { //si no existe manda un error diciendo que no existe
            res.status(404).json({ text: 'El club no existe' });
        }
        console.log(rows);
    })
  };

  crea(presidente, req, res){
    var list = db.query(' INSERT INTO club set ?', [req.body], (err, rows, fields) => {
        db.query(' SELECT codClub FROM club WHERE presidente = ? ORDER BY codClub DESC', [presidente], (err, rows, fields) => {
            const codClub = rows[0].codClub;
            db.query(' INSERT INTO socios (codUsuario, codClub) VALUES (?, ?)', [presidente, codClub], (err, rows, fields) => {
                console.log(req.body);
                res.json({ text: 'club guardado' });
            });
        });
    });
  };

  borra(idClub, res){
    var list = db.query('DELETE FROM club WHERE codClub = ?', [idClub], (err, rows) => {
        if (!err) {
            res.send('Club eliminado');
            console.log('Club eliminado');
        } else {
            console.log(err);
        }
    })
  };

  borraSocio(idS, res){
    var list = db.query('DELETE FROM socios WHERE codSocio = ?', [idS], (err, rows) => {
        if (!err) {
            res.send('Socio eliminado');
            console.log('Socio eliminado');
        } else {
            console.log(err);
        }
    })
  };

  modificacion(idClub, desClub, nomClub, icono, res){
    var list = db.query('UPDATE club set nomClub = ?, desClub = ?, icono = ? WHERE codClub = ?', [nomClub, desClub, icono, idClub], (err, rows) => {
        if (!err) {
            res.send('Club actualizado');
            console.log('Club actualizado');
        } else {
            console.log(err);
        }
    })
  };

  unirseClub(idUser, idClub, res){
    var list = db.query('INSERT INTO socios (codUsuario, codClub) VALUES (?, ?)', [idUser, idClub], (err, rows) => {
        if (err) console.log(err);
    })
  };

  salirClub(idUser, idClub, res){
    var list = db.query('DELETE FROM socios WHERE codUsuario = ? AND codClub = ?', [idUser, idClub], (err, rows) => {
        if (err) console.log(err);
    })
  };

  cogerSocios(idUser, idClub, res){
    var list = db.query('SELECT * FROM socios WHERE codUsuario = ? AND codClub = ?', [idUser, idClub], (err, rows) => {
        if (err) console.log(err);
        res.json(rows);
    })
  };

  cogerLibrodelMes(mes, codClub, res){
    var list = db.query('SELECT T.*, LM.* FROM titulo T JOIN libros L ON (T.codTitulo = L.codTitulo) JOIN libromes LM ON (LM.codLibro = L.codLibro) WHERE LM.mes = ? AND LM.codClub = ?', [mes, codClub], (err, rows) => {
        if (err) console.log(err);
        res.json(rows);
    })
  };

  cogerLibrosDelMes(codClub, month, res){
    var list = db.query('SELECT t.titulo, t.ISBN, t.portada, lm.mes FROM libromes lm JOIN libros l ON (lm.codLibro = l.codLibro) JOIN titulo t ON (l.codTitulo = t.codTitulo) WHERE lm.codClub = ? AND lm.mes != ?', [codClub, month], (err, rows) => {
        if (err) console.log(err);
        res.json(rows);
    })
  };

  mesLibro(idClub, idLib, month, res){
    var list = db.query('SELECT mes FROM libromes WHERE codClub = ? AND mes = ?', [idClub, month], (err, rows) => {
        if (err) console.log(err);
        if (rows[0]) mes = rows[0].mes;
        if (mes === month) {
            db.query('UPDATE libromes SET codLibro = ? WHERE mes = ? AND codClub = ?', [idLib, month, idClub], (err, rows) => {
                if (err) console.log(err);
            })
        } else {
            db.query('INSERT INTO libromes (mes, puntuacion, codLibro, codClub) VALUES (?, 0, ?, ?)', [month, idLib, idClub], (err, rows) => {
                if (err) console.log(err);
            })
        }
    })
  };

  listaClubSocios(res){
    var list = db.query("SELECT c.nomClub AS 'nombre', COUNT(s.codClub) AS 'cuenta' FROM club c JOIN socios s on (c.codClub = s.codClub) GROUP BY c.nomClub ORDER BY 2 DESC LIMIT 5", (err, rows, fields) => {
        res.json(rows);
    })
  };

  listaSociosClub(idClub, res){
    var list = db.query("SELECT c.nomUsuario AS 'nombre', codSocio, s.codUsuario FROM usuario c JOIN socios s on (c.codUsuario = s.codUsuario) WHERE s.codClub = ? ", [idClub], (err, rows, fields) => {
        res.json(rows);
    })
  };

}

module.exports = ClubService = new ClubService();
