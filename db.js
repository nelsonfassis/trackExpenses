var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '192.168.150.129', //process.env.DB_HOST,
  user: 'root', // process.env.DB_USER,
  password: 'password', //process.env.DB_PASSWORD,
  database: 'trackexpenses' //process.env.DB_NAME,
})

connection.connect();

// connection.query('SELECT 1 + 1 AS solution',
//   function (error, results, fields){
//     if(error) throw error;
//   console.log('the solution is: ', results[0].solution);
// });

module.exports = connection;
