// mysql
require("dotenv").config();

var mysql = require("mysql");
var database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

database.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected to mySQL DB");
  }
});

module.exports = database;
