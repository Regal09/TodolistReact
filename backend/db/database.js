var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist'
});

connection.connect(error => {
    if(error) throw error;
    console.log("DB connected");
});

module.exports = connection;