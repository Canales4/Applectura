var express = require('express');
var prof = express.Router();
var controlador = require('../controllers/ProfileController');


prof.delete('/profile/delete/:codUsuario', controlador.profDelete );

prof.put('/profile/modify/:codUsuario', controlador.profMody );

prof.post('/profile/consultaFavorito', controlador.conFav );

prof.get('/profile/lastFavorite/:codUsuario', controlador.lastFav );

module.exports = prof;
