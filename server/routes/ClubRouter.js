var express = require('express');
var club = express.Router();

//ruta hacia los controladores
var controlador = require('../controllers/ClubControllers');

// //para listar todos los clubs
// club.get('/', controlador.listAll);

//para buscar clubs
club.get('/clubs/:termino', controlador.list);

//para listar los clubs del usuario
club.get('/list/:idUser', controlador.listClubUser);

//para listar los socios
club.get('/listaC/:idClub', controlador.listSociosClubs);

//para listar los clubs con más socios
club.get('/listS/socios', controlador.listClubSocios);

//obtener un club
club.get('/:idClub', controlador.getOne);

//crear un club
club.post('/', controlador.create);

//borrar un club
club.delete('/:idClub', controlador.delete);

//actualizar un club
club.put('/:idClub', controlador.update);

club.post('/join', controlador.joinClub);

club.delete('/leave/:idUser/:idClub', controlador.leaveClub);

club.get('/socios/:idUser/:idClub', controlador.getSocios);

club.post('/monthBook', controlador.monthBook);

club.get('/monthBooks/:codClub/:month', controlador.getMonthsBooks);

club.get('/libroMes/:mes/:codClub', controlador.getMonthBook);

//eliminar un socio
club.delete('/expel/:idS', controlador.deleteSocio);


module.exports = club;