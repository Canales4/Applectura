const Sequelize = require('sequelize') //Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations
const db = require("../database/db-user.js")

module.exports = db.sequelize.define(
    'user', {
        codUsuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomUsuario: {
            type: Sequelize.STRING,
            required: 'Full name can\`t be empty'
        },
        apellido1: {
            type: Sequelize.STRING,
        },
        apellido2: {
            type: Sequelize.STRING,
        },
        contrasena: {
            type: Sequelize.STRING,
            required: 'Full name can\`t be empty'
        },
        email: {
            type: Sequelize.STRING,
            required: 'Full name can\`t be empty'
        },
        fechaRegistro: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        sexo: {
            type: Sequelize.STRING
        },
        visibilidad: {
            type: Sequelize.STRING
        },
        bio: {
            type: Sequelize.STRING
        },
        alias: {
            type: Sequelize.STRING
        },
        icono: {
            type: Sequelize.STRING
        },
        fechaNac: {
            type: Sequelize.STRING
        }

    }, {
        tableName: 'usuario', // aqui se pone el nombre de la tabla donde cogera los datos
        timestamps: false
    }
)