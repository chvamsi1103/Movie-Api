import knex from 'knex';
import path from 'path';

const moviesDb = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(process.env.MOVIES_DB_PATH || './db/movies.db')
  },
  useNullAsDefault: true
});

export default moviesDb;
