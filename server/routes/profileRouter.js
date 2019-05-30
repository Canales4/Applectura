var express = require('express');
var router = express.Router();
var conn = require('../database/db');

// ELIMINAR PERFIL
router.delete('/profile/delete/:codUsuario', function(req, res, next) {
    const { codUsuario } = req.params;
    // CONSULTA
    conn.query('DELETE FROM usuario WHERE codUsuario = ?', [codUsuario], (err, rows) => {
        if (!err) {
            res.send('eliminado');
        } else {
            console.log(err);
        }
    });
});

// MODIFICAR PERFIL

router.put('/profile/modify/:codUsuario', function(req, res, next) {

    console.log(req.body);
    // DEFINIR
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
    const contrasena = (req.body.contrasena);
    const fechaNac = req.body.fechaNac;


    // CONSULTA
    var sentencia = `UPDATE usuario set nomUsuario ='${nombre}', apellido1='${apellido1}', apellido2='${apellido2}', contrasena='${contrasena}', sexo='${sexo}', visibilidad ='${visi}', email ='${email}',
                     bio='${bio}', alias='${alias}', icono='${icono}', fechaNac='${fechaNac}' WHERE codUsuario = '${codUsuario}'`;
    console.log(codUsuario)


    conn.query(sentencia, (err, rows) => {
        if (!err) {

        } else {
            console.log(err);
        }

    });
});

// LIBRO FAVORITO

// CONSULTA

router.post('/profile/consultaFavorito', (req, res, next) => {
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    conn.query('SELECT codFavoritos FROM favoritos WHERE codLibro = ? and codUsuario = ?', [codLibro, codUsuario], (err, rows, next) => {
        if (err) console.log(err);
        res.json(rows);
        console.log(rows);
    });
});


router.get('/profile/lastFavorite/:codUsuario', (req, res, next) => {
    const { codUsuario } = req.params;
    console.log('Este es mi codigo usuario ' + codUsuario);
    conn.query('SELECT titulo, portada FROM titulo T JOIN libros L ON(T.codTitulo= L.codTitulo) JOIN favoritos F ON(L.codlibro=F.codLibro) WHERE codUsuario = ? ORDER BY codFavoritos DESC limit 3', [codUsuario], (err, rows) => {
        if (err) console.log(err);
        res.json(rows);
    });
});


module.exports = router;
