// mysql
require("dotenv").config();

var mysql = require("mysql");
var database = mysql.createConnection(process.env.JAWSDB_URL);

database.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected to mySQL DB");
  }
});

database.end();

module.exports = database;
