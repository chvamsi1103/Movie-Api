import knex from 'knex';
import path from 'path';

const ratingsDb = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(process.env.RATINGS_DB_PATH || './db/ratings.db')
  },
  useNullAsDefault: true
});

export default ratingsDb;
