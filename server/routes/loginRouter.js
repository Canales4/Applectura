var express = require('express');
const cors = require('cors');
var login = express.Router();
login.use(cors());
var controlador = require('../controllers/LoginController');


login.post('/register', controlador.register );

login.post('/login', controlador.login );

login.get('/profile', controlador.profile );

module.exports = login;
