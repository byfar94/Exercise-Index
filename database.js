const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.log(err.message);

    console.log("connection successful");
  }
);
/*
// Create the exercises table if not exists
db.run(`
  CREATE TABLE exercises (
    id INTEGER PRIMARY KEY,
    extitle TEXT NOT NULL,
    extype TEXT,
    bodypart TEXT,
    summary TEXT,
    video_id TEXT
  )
`);
/*
const sql = `INSERT INTO exercises (id, extitle, extype, bodypart, summmary, video_id)``values (?,?,?,?,?,?)`;
*/

db.close((err) => {
  if (err) console.log(err.message);
});

module.exports = db;
