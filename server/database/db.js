const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'db',
    port: '3306',
    user: 'root',
    password: 'mypass',
    database: 'app_lecturas'
});

mysqlConnection.connect((err, data) => {
    if (err) throw err;
    console.log("DB is CONNECTED".yellow);
});


module.exports = mysqlConnection;
