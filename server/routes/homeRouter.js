var express = require('express');
var home = express.Router();
var controlador = require('../controllers/HomeControllers');


home.get('/', controlador.root);

home.get('/home', controlador.home);

home.get('/bestbook', controlador.bestBook );

home.get('/iconHome/:codUsuario', controlador.iconHome );

home.get('/newClub', controlador.newClub );

home.get('/lastBookAdd', controlador.lastBookAdd );

home.get('/mostRead', controlador.mostRead );

home.get('/searchUser/:termino', controlador.searchUser );

home.post('/favoritos', controlador.favoritos );

home.post('/deleteFavorito', controlador.deleteFavorito );

home.post('/consultaFavorito', controlador.consultaFavorito );

home.get('/lastFavoriteISBN/:cod', controlador.lastFavoriteISBN );

module.exports = home;
