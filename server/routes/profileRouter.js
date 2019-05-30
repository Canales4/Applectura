var express = require('express');
var prof = express.Router();
var controlador = require('../controllers/ProfileController');


prof.delete('/delete/:codUsuario', controlador.profDelete );

prof.put('/modify/:codUsuario', controlador.profMody );

prof.post('/consultaFavorito', controlador.conFav );

prof.get('/lastFavorite/:codUsuario', controlador.lastFav );

module.exports = prof;
