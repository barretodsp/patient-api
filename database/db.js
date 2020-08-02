
const pg = require("pg");

const setDatase = () =>{
  if(process.env.NODE_ENV === 'development')
    return process.env.DB_DEV
  else if (process.env.NODE_ENV === 'test')
    return process.env.DB_TEST
  else return process.env.DB_DEV
}

var config = {
  database: setDatase(),
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 10000,
  max: 30,
};
const pool = new pg.Pool(config);

async function connect() {
  const client = await pool.connect();
  return client;
}

module.exports = {
  connect
}