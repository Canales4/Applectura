var express = require('express');
var login = express.Router();
var controlador = require('../controllers/LoginController');


login.post('/register', controlador.register );

login.post('/login', controlador.login );

login.get('/profile', controlador.profile );

module.exports = login;
