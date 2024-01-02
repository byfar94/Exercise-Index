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

// Create the exercises table if not exists
db.run(`
CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY,
    extitle TEXT NOT NULL,
    extype TEXT,
    bodypart TEXT,
    summary TEXT,
    imagepath TEXT,
    videoid TEXT
  )
`);

process.on("SIGINT", () => {
  // Close the database connection when the application is shutting down
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the database connection.");
    process.exit(0);
  });
});
module.exports = db;
