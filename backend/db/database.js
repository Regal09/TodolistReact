var mysql = require('mysql');

var connection = mysql.createConnection({
    host: mysql-egdadi.alwaysdata.net,
    user: egdadi,
    password: Y_eJ4wnpqdZ,
    database: egdadi_todolist
});

//DB_HOST=""
//DB_USERNAME=""
//DB_PASSWORD=""
//DB_DBNAME=""

connection.connect(error => {
    if(error) throw error;
    console.log("DB connected");
});

module.exports = connection;