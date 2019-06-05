var db = require('../database/db');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
process.env.SECRET_KEY = 'secret'

class LoginService{
    regitrar(){
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

        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
          console.log('user is: ' + user);
          if (!user) {
              userData.contrasena= (req.body.contrasena);
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
    };

    inicio(){
      User.findOne({
          where: {
              email: req.body.email,
              contrasena: (req.body.contrasena),
          }
      })
      .then(user => {
          console.log('pass is: ' + req.body.contrasena);
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
    };

    perfil(){
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
              res.send('user does not exist')
          }
      })
      .catch(err => {
          res.send('error:' + err)
      })
    };
}

module.exports = LoginService = new LoginService();
