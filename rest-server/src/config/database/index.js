import { Pool } from 'pg';

const config = {
  user: 'root',
  host: 'localhost',
  database: 'MatchMe',
  password: '',
  port: 5432
};

const db = new Pool(config);

db.on('connect', () => {
  console.log('Connected to Database Successfully');
});

db.connect();

module.exports = db;
