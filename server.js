const dotenv = require('dotenv');
dotenv.config();

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  exit(1);
});

const DB_connection = require('./utils/DB-connection');
const app = require('./app');
const port = 3000;

const server = app.listen(port, () => {
  console.log(`the server running on port: ${port}...`);
});
DB_connection().then(console.log('Connected to the database'));

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
