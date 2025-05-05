// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'root',
//   database: process.env.DB_NAME || 'employee_management',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool;

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