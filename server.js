const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const app = require('./app');
const port = 3000;

const DB_options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
const DB_uri = process.env.DB.replace(
  '<password>',
  process.env.DB_PASSWORD,
  DB_options
);

mongoose.connect(DB_uri).then((con) => {});

app.listen(port, () => {
  console.log(`the server running on port: ${port}...`);
});
