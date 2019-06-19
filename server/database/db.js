const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'db',
    port: '3306',
    user: 'user290',
    password: 'VHJL_290',
    database: 'app_lecturas'
});

mysqlConnection.connect((err, data) => {
    if (err) throw err;
    console.log("DB is CONNECTED".yellow);
});


module.exports = mysqlConnection;
