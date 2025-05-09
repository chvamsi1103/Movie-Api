// import knex from 'knex';
// import path from 'path';

// const db = knex({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../../db/movies.db')
//   },
//   useNullAsDefault: true
// });

// // Attach ratings.db after connection
// (async () => {
//   await db.raw(`ATTACH DATABASE '${path.join(__dirname, '../../db/ratings.db')}' AS ratingsDB`);
// })();

// export default db;
