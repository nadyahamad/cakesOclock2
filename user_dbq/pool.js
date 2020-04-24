const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */
const pool = mysql.createPool({
    connectionLimit: 10,
    host:"cakesdb1.cvnkqaqbljxc.us-east-1.rds.amazonaws.com",
    user: "admin",
    password : "Ireland1",
    database : "cakesOclockSch", //schemaName
    multipleStatements : true
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
