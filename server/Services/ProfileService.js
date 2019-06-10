var db = require('../database/db');

class ProfileService{
    borrarPerfil(codUsuario, res){
      db.query('DELETE FROM usuario WHERE codUsuario = ?', [codUsuario], (err, rows) => {
          if (!err) {
              res.send('eliminado');
          } else {
              console.log(err);
          }
      });
    };

    modificarPerfil(res){
      const codUsuario = req.body.codUsuario;
      const nombre = req.body.nomUsuario;
      const apellido1 = req.body.apellido1;
      const apellido2 = req.body.apellido2;
      const sexo = req.body.sexo;
      const visi = req.body.visibilidad;
      const email = req.body.email;
      const bio = req.body.bio;
      const alias = req.body.alias;
      const icono = req.body.icono;
      const contrasena = req.body.contrasena;
      const fechaNac = req.body.fechaNac;
      var sentencia = `UPDATE usuario set nomUsuario ='${nombre}', apellido1='${apellido1}', apellido2='${apellido2}', contrasena='${contrasena}', sexo='${sexo}', visibilidad ='${visi}', email ='${email}',
                       bio='${bio}', alias='${alias}', icono='${icono}', fechaNac='${fechaNac}' WHERE codUsuario = '${codUsuario}'`;
    };

    codigoFavorito(codLibro, codUsuario, res){
      db.query('SELECT codFavoritos FROM favoritos WHERE codLibro = ? and codUsuario = ?', [codLibro, codUsuario], (err, rows, next) => {
          if (err) console.log(err);
          res.json(rows);
          console.log(rows);
      });
    };

    ultimoFavorito(codUsuario, res){
      db.query('SELECT titulo, portada FROM titulo T JOIN libros L ON(T.codTitulo= L.codTitulo) JOIN favoritos F ON(L.codlibro=F.codLibro) WHERE codUsuario = ? ORDER BY codFavoritos DESC limit 3', [codUsuario], (err, rows) => {
          if (err) console.log(err);
          res.json(rows);
      });
    };
}

module.exports = ProfileService = new ProfileService();
