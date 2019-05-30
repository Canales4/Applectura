//Aqui vamos a definir los controladores que tendra club
var db = require('../database/db');

class ClubController {
    // //para sacar la lista entera de clubs
    // listAll(req, res) {
    //     db.query('SELECT * FROM club', (err, rows, fields) => {
    //         res.json(rows);
    //     })
    // };

    //para buscar clubs por nombre
    list(req, res) {
        const termino = `${req.params.termino}%`;
        db.query('SELECT * FROM club WHERE nomClub LIKE ?', [termino], (err, rows, fields) => {
            if (rows.length > 0) { //si el club existe muestralo
                res.json(rows);
            } else { //si no existe manda un error diciendo que no existe
                res.status(404).json({ text: 'El club no existe' });
            }
            console.log(rows);
        })
    };

    //para sacar la lista de clubs del usuario
    listClubUser(req, res) {
        const { idUser } = req.params;
        db.query('SELECT a.codClub, a.nomClub, a.presidente FROM club a LEFT JOIN socios b on (a.codClub = b.codClub) WHERE b.codUsuario = ? OR a.presidente = ? GROUP BY nomclub', [idUser, idUser], (err, rows, fields) => {
            if (err) console.log(err);
            res.json(rows);
        })
    };

    //para sacar un club especifico
    getOne(req, res) {
        const { idClub } = req.params;
        db.query('SELECT * FROM club WHERE codClub = ?', [idClub], (err, rows, fields) => {
            if (rows.length > 0) { //si el club existe muestralo
                res.json(rows);
            } else { //si no existe manda un error diciendo que no existe
                res.status(404).json({ text: 'El club no existe' });
            }
            console.log(rows);
        })
    };

    //para crear un club
    create(req, res) {
        const {  presidente } = req.body;
        db.query(' INSERT INTO club set ?', [req.body], (err, rows, fields) => {
            db.query(' SELECT codClub FROM club WHERE presidente = ? ORDER BY codClub DESC', [presidente], (err, rows, fields) => {
                const codClub = rows[0].codClub;
                db.query(' INSERT INTO socios (codUsuario, codClub) VALUES (?, ?)', [presidente, codClub], (err, rows, fields) => {
                    console.log(req.body);
                    res.json({ text: 'club guardado' });
                }); 
            });
        });
    };

    //Para borrar el club
    delete(req, res) {
        const { idClub } = req.params;
        db.query('DELETE FROM club WHERE codClub = ?', [idClub], (err, rows) => {
            if (!err) {
                res.send('Club eliminado');
                console.log('Club eliminado');
            } else {
                console.log(err);
            }
        })
    };

    //Para eliminar un socio
    deleteSocio(req, res) {
        const { idS } = req.params;
        db.query('DELETE FROM socios WHERE codSocio = ?', [idS], (err, rows) => {
            if (!err) {
                res.send('Socio eliminado');
                console.log('Socio eliminado');
            } else {
                console.log(err);
            }
        })
    };

    //para actualizar el club
    update(req, res) {
        const { idClub } = req.params;
        const { desClub } = req.body;
        const { nomClub } = req.body;
        const { icono } = req.body;
        db.query('UPDATE club set nomClub = ?, desClub = ?, icono = ? WHERE codClub = ?', [nomClub, desClub, icono, idClub], (err, rows) => {
            if (!err) {
                res.send('Club actualizado');
                console.log('Club actualizado');
            } else {
                console.log(err);
            }
        })
    };

    joinClub(req, res) {
        const { idUser } = req.body;
        const { idClub } = req.body;
        db.query('INSERT INTO socios (codUsuario, codClub) VALUES (?, ?)', [idUser, idClub], (err, rows) => {
            if (err) console.log(err);
        })
    }

    leaveClub(req, res) {
        const { idUser } = req.params;
        const { idClub } = req.params;
        db.query('DELETE FROM socios WHERE codUsuario = ? AND codClub = ?', [idUser, idClub], (err, rows) => {
            if (err) console.log(err);
        })
    }

    getSocios(req, res) {
        const { idUser } = req.params;
        const { idClub } = req.params;
        db.query('SELECT * FROM socios WHERE codUsuario = ? AND codClub = ?', [idUser, idClub], (err, rows) => {
            if (err) console.log(err);
            res.json(rows);
        })
    }
    
    getMonthBook(req, res) {
        const { mes } = req.params;
        const { codClub } = req.params;
        db.query('SELECT T.*, LM.* FROM titulo T JOIN libros L ON (T.codTitulo = L.codTitulo) JOIN libromes LM ON (LM.codLibro = L.codLibro) WHERE LM.mes = ? AND LM.codClub = ?', [mes, codClub], (err, rows) => {
            if (err) console.log(err);
            res.json(rows);
        })
    }

    getMonthsBooks(req, res) {
        const { codClub } = req.params;
        const { month } = req.params;
        db.query('SELECT t.titulo, t.ISBN, t.portada, lm.mes FROM libromes lm JOIN libros l ON (lm.codLibro = l.codLibro) JOIN titulo t ON (l.codTitulo = t.codTitulo) WHERE lm.codClub = ? AND lm.mes != ?', [codClub, month], (err, rows) => {
            if (err) console.log(err);
            res.json(rows);
        })
    }

    monthBook(req, res) {
        const { idClub } = req.body;
        const { idLib } = req.body;
        const { month } = req.body;
        var mes = 'none';
        db.query('SELECT mes FROM libromes WHERE codClub = ? AND mes = ?', [idClub, month], (err, rows) => {
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
    }

    //para sacar la lista de clubs con más socios
    listClubSocios(req, res) {
        db.query("SELECT c.nomClub AS 'nombre', COUNT(s.codClub) AS 'cuenta' FROM club c JOIN socios s on (c.codClub = s.codClub) GROUP BY c.nomClub ORDER BY 2 DESC LIMIT 5", (err, rows, fields) => {
            res.json(rows);
        })
    };

    //para sacar la lista de clubs con más socios
    listSociosClubs(req, res) {
        const { idClub } = req.params;
        console.log(idClub);
        db.query("SELECT c.nomUsuario AS 'nombre', codSocio, s.codUsuario FROM usuario c JOIN socios s on (c.codUsuario = s.codUsuario) WHERE s.codClub = ? ", [idClub], (err, rows, fields) => {
            res.json(rows);
        })
    };

}

module.exports = ClubController = new ClubController();