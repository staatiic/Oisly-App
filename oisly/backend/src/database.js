const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bubadb',
  password: '0715',
  port: 5432,
});

module.exports = pool;
