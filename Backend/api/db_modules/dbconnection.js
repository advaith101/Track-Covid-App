// var sql = require('mssql');
const mysql = require('mysql2/promise');
const connectionPool = mysql.createPool({
    host: 'localhost',
    // port: '8080',
    user: 'root',
    password: 'whateveryouneed',
    database: 'whateveryouschemaiscalled',
    multipleStatements: true

})
// const config = {
//     user: 'root',
//      password: 'root',
//      server: 'localhost',
//      database: 'apparelstore',
//      pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: false
//     },
//     port:1433
// };

// const pool = new sql.ConnectionPool(config);
// connection = pool;
// poolConnect = connection.connect();

// connection.on('error', err => {
//     // ... error handler
//     console.log('err from db conf' + err);
// })  

 dbConnection = connectionPool;
 

module.exports = connectionPool;