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

const connectToDB = () => {
  return mongoose.connect(DB_uri);
};

module.exports = connectToDB;
