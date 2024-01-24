const database = require("./database.js");

const createExercisesTableQuery = `CREATE TABLE IF NOT EXISTS exercises (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  extitle VARCHAR(50) NOT NULL,
  extype VARCHAR(20),
  bodypart VARCHAR(20),
  summary VARCHAR(255),
  imagepath VARCHAR(255),
  videoid VARCHAR(50)
)`;

async function createTable() {
  try {
    const result = await database.query(createExercisesTableQuery);
    console.log('"exercises" table created successfully!');
    console.log(result);
  } catch (err) {
    console.error('Error creating "exercises" table:', err);
  } finally {
    database.end(); // Close the database connection
  }
}

createTable();
