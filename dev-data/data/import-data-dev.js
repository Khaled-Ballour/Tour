const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
const fs = require('fs');
const Tour = require('../../Models/tourModel');
const DB_connection = require('../../utils/DB-connection');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully loaded!');
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted!');
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

DB_connection();
if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
