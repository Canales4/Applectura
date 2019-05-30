const Sequelize = require("sequelize") //Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
const db = {}
const sequelize = new Sequelize("app_lecturas", "root", "", { //decimos a la base de datos que nos vamos a conectar
    // host: '172.21.57.79',
    // host: '172.21.57.106',
    host: 'localhost',
    port: '3306',
    dialect: "mysql",
    operatorAliases: false,

    //pool configura las conexiones a la base de datos
    pool: {
        max: 10, //maximo numero de conexiones
        min: 0,
        acquire: 30000,
        indle: 10000
    }
})

db.sequelize = sequelize
module.exports = db
