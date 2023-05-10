const dotenv = require('dotenv');
dotenv.config();

const DB_connection = require('./utils/DB-connection');
const app = require('./app');
const port = 3000;

DB_connection().then(() => {
  app.listen(port, () => {
    console.log(`the server running on port: ${port}...`);
  });
});
