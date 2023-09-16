var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME
});

//DB_HOST="mysql-egdadi.alwaysdata.net"
//DB_USERNAME="egdadi"
//DB_PASSWORD="Y_eJ4wnpqdZ"
//DB_DBNAME="egdadi_todolist"

connection.connect(error => {
    if(error) throw error;
    console.log("DB connected");
});

module.exports = connection;