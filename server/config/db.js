const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',       // Your MySQL host
  user: 'root',            // Your MySQL username
  password: 'root',            // Your MySQL password (empty if none)
  database: 'employee_management', // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;