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

database.query(createExercisesTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating "exercises" table:', err);
    return;
  }
  console.log('"exercises" table created successfully!');
  console.log(result);
  database.end(); // Close the database connection
});
