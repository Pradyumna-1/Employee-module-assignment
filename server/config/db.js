const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',       //  MySQL host
  user: 'root',            //  MySQL username
  password: 'root',            //  MySQL password
  database: 'employee_management', // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
