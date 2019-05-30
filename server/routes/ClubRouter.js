var express = require('express');
var club = express.Router();
var controlador = require('../controllers/ClubControllers');


club.get('/clubs/:termino', controlador.list);

club.get('/list/:idUser', controlador.listClubUser);

club.get('/listaC/:idClub', controlador.listSociosClubs);

club.get('/listS/socios', controlador.listClubSocios);

club.get('/:idClub', controlador.getOne);

club.post('/', controlador.create);

club.delete('/:idClub', controlador.delete);

club.put('/:idClub', controlador.update);

club.post('/join', controlador.joinClub);

club.delete('/leave/:idUser/:idClub', controlador.leaveClub);

club.get('/socios/:idUser/:idClub', controlador.getSocios);

club.post('/monthBook', controlador.monthBook);

club.get('/monthBooks/:codClub/:month', controlador.getMonthsBooks);

club.get('/libroMes/:mes/:codClub', controlador.getMonthBook);

club.delete('/expel/:idS', controlador.deleteSocio);


module.exports = club;
