var express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const users = express.Router();
var db = require('../database/db');
const User = require('../models/User');
users.use(cors());

process.env.SECRET_KEY = 'secret'

//registro
users.post('/register', (req, res) => {
        const today = new Date()
        const userData = {
                nomUsuario: req.body.nomUsuario,
                apellido1: req.body.apellido1,
                apellido2: req.body.apellido2,
                contrasena: req.body.contrasena,
                email: req.body.email,
                fechaRegistro: today,
                icono: req.body.icono,
                bio: req.body.bio,
                sexo: req.body.sexo,
                alias: req.body.alias,
                visibilidad: req.body.visibilidad,
                fechaNac: req.body.fechaNac

            }
            //vemos si existe un usuario con el mismo correo
        User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                console.log('user is: ' + user);
                if (!user) {
                    userData.contrasena= (req.body.contrasena);
                    //si no existe un usuario con el mismo email lo creamos y le damos un token
                    User.create(userData)
                        .then(user => {
                            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                                expiresIn: 1440
                            })
                            res.json({ token: token })
                            db.query('INSERT INTO favoritos (codLibro, codUsuario) VALUES (1, ?)', [user.dataValues.codUsuario], (err, rows, fields) => {
                              if (err) console.log(err);
                            })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                } else {
                    res.json({ error: 'User already exist' })
                }
            })
            .catch(err => {
                res.send('error' + err)
            })
    })
    //LOGIN
users.post('/login', (req, res) => {
    //vemos si existe un usuario con el mismo correo y misma contraseña
    User.findOne({
            where: {
                email: req.body.email,
                contrasena: (req.body.contrasena),
            }
        })
        .then(user => {
            console.log('pass is: ' + req.body.contrasena);
            //  if (bcrypt.compare(req.body.contrasena, user.contrasena)){
            //si existe el usuario le damos un token
            if (user) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
            } else {
                res.send('user does not exist')
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
})

//perfil
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY) //se verifica que el token es el mismo. decoded pillara todos los elementos de user que contengamos
    console.log('EL elemento decoded contiene' + decoded)
    User.findOne({
            where: {
                codUsuario: decoded.codUsuario
            }
        })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('user does not exist') //si no existe la id decimos que el usuario no existe
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
})


module.exports = users;
