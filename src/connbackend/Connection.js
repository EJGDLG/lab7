const mysql = require('mysql2/promise');
const { readFileSync } = require('fs');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog',
    port: 3002, 
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
});

module.exports = pool;
