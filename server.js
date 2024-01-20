const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const db = require("./database.js");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//will use webpackmiddleware if using dev server, will skip below code if in production mode
if (process.env.NODE_ENV !== "production") {
  useDevConfig();
  console.log("Looks like we are in development mode!");
}

function useDevConfig() {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const config = require("./webpack.dev.js");
  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );
}

const port = process.env.PORT || 3000;

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/images");
  },
  filename: function (req, file, cb) {
    const { extitle } = req.body;
    let imgFileName = extitle.replace(/\s+/g, "");
    const fileName = `${imgFileName}.jpeg`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

/*
app.get("/info", async (req, res) => {
  let APIKey = process.env.API_KEY;
  const apiUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLqhofO-4kYdstIouG7AtMPWUXL1ZwvGSG&key=${APIKey}`;
  const fetchResponse = await fetch(apiUrl);
  console.log(fetchResponse);
  const json = await fetchResponse.json();
  console.log(json);
  res.json(json);
});
*/

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`starting server at port ${port}`);
});

// Post request at /exercise will add extitle, extpye, bodypart, summar, video_id into the database from front end form
app.post("/exercise", upload.single("imgfile"), (req, res) => {
  try {
    console.log(req.body.extype);
    console.log(req.files);
    console.log(req.body.imgfile);
    let exerciseTitle = req.body.extitle;
    let imgFileName = exerciseTitle.replace(/\s+/g, "");
    const sql = `INSERT INTO exercises (extitle, extype, bodypart, summary, imagepath, videoid) values (?,?,?,?,?,?)`;
    console.log(sql);
    console.log(db);
    db.run(
      sql,
      [
        `${req.body.extitle}`,
        `${req.body.extype}`,
        `${req.body.bodypart}`,
        `${req.body.summary}`,
        `../images/${imgFileName}.jpeg`,
        `${req.body.videoid}`,
      ],
      (err) => {
        if (err) return console.log(err.message);
        else return console.log("added to database");
      }
    );
    return res.json({
      status: 200,
      success: true,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

app.get("/exercise", (req, res) => {
  const sql = `SELECT * FROM exercises;`;
  db.all(sql, [], (err, rows) => {
    if (err) console.log(err.message);

    res.status(200).json(rows);
  });
});

app.get("/exercise/bodypart/:bodypart", (req, res) => {
  console.log("boydpart backend ran");
  const bodypart = req.params.bodypart; // Corrected parameter name
  const sql = "SELECT * FROM exercises WHERE bodypart = ?";
  console.log(bodypart);
  db.all(sql, [bodypart], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
});

/*

// Filter by Exercise Type
app.get('/exercise/extype/:extype', (req, res) => {
  const extype = req.params.extype;
  // Query to filter by extype
});


*/

app.delete("/exercise/:id", async (req, res) => {
  try {
    console.log(req.body.objTitle);
    let title = req.body.objTitle;
    let imgFileName = title.replace(/\s+/g, "");
    console.log(req.params.id);
    let cardID = req.params.id;
    const sql = `DELETE from exercises where id = ?`;

    db.run(sql, cardID, (err) => {
      if (err) return console.error(err.message);
    });
    fs.unlink(`./images/${imgFileName}.jpeg`, (err) => {
      if (err) console.log(err);
      else {
        console.log(`\nDeleted file: ./images/${imgFileName}.jpeg`);
      }
    });
    return res.json({
      status: 200,
      success: true,
    });
  } catch {
    return res.json({
      status: 400,
      success: false,
    });
  }
});
