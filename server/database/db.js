const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: '165.22.62.165',
    port: '3307',
    user: 'user290',
    password: 'VHJL_290',
    database: 'app_lecturas'
});

mysqlConnection.connect((err, data) => {
    if (err) throw err;
    console.log("DB is CONNECTED".yellow);
});


module.exports = mysqlConnection;
