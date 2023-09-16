var mysql = require('mysql2');

var url = 'mysql://root:amPfMATJckzjp8lxXEhI@containers-us-west-197.railway.app:6386/railway';

var connection = mysql.createConnection(url);

/*mysql.createConnection({
    host: 'containers-us-west-197.railway.app',
    user: 'root',
    password: 'amPfMATJckzjp8lxXEhI',
    database: 'railway'
});*/

//DB_HOST=""
//DB_USERNAME=""
//DB_PASSWORD=""
//DB_DBNAME=""

connection.connect(error => {
    if(error) throw error;
    console.log("DB connected");
});

module.exports = connection;