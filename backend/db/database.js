var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'mysql-egdadi.alwaysdata.net',
    user: 'egdadi',
    password: 'Y_eJ4wnpqdZ;rpc',
    database: 'egdadi_todolist'
});

connection.connect(error => {
    if(error) throw error;
    console.log("DB connected");
});

module.exports = connection;