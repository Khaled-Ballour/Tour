const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./utils/DB-connection');

const app = require('./app');
const port = 3000;

connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`the server running on port: ${port}...`);
  });
});
