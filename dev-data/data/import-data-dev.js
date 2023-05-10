const mongoose = require('mongoose');
const Tour = require('../../Models/tourModel');

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
