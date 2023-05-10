const mongoose = require('mongoose');

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

const DB_connection = () => {
  return mongoose.connect(DB_uri);
};

module.exports = DB_connection;
