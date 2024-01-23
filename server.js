const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./database.js");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");

//AWS
const s3 = require("./bucket.js");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const bucketName = process.env.AWS_BUCKET_NAME;
//---
const sharp = require("sharp");

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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`starting server at port ${port}`);
});

// Post request at /exercise will add extitle, extpye, bodypart, summar, video_id into the database from front end form, will add picture to s3 bucket
app.post("/exercise", upload.single("imgfile"), async (req, res) => {
  try {
    console.log(req.body.extype);
    console.log(req.file.buffer);
    let exerciseTitle = req.body.extitle;
    let exerciseTitleNoSpace = exerciseTitle.replace(/\s+/g, "");
    let imgFileName = `${exerciseTitleNoSpace}.jpeg`;

    const fileBuffer = req.file.buffer;

    // Get the original width and height of the image
    const { width, height } = await sharp(fileBuffer).metadata();

    // Calculate the new dimensions by halving both width and height
    const newWidth = Math.round(width / 2);
    const newHeight = Math.round(height / 2);

    // Convert and resize the image using sharp
    const resizedImageBuffer = await sharp(fileBuffer)
      .resize({ width: newWidth, height: newHeight })
      .jpeg({ quality: 90 })
      .toBuffer();

    const params = {
      Bucket: bucketName,
      Key: imgFileName,
      Body: resizedImageBuffer,
    };
    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
      console.log("Object successfully uploaded to S3");
    } catch (error) {
      console.error("Error uploading object to S3:", error);
    }
    const sql = `INSERT INTO exercises (extitle, extype, bodypart, summary, imagepath, videoid) values (?,?,?,?,?,?)`;
    console.log(sql);
    database.query(
      sql,
      [
        `${req.body.extitle}`,
        `${req.body.extype}`,
        `${req.body.bodypart}`,
        `${req.body.summary}`,
        `${imgFileName}`,
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

//query all
app.get("/exercise", async (req, res) => {
  const sql = `SELECT * FROM exercises`;
  database.query(sql, function (err, result) {
    if (err) {
      console.error("Error executing SELECT query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log(result);
    res.status(200).json(result);
  });
});

//query by bodypart
app.get("/exercise/bodypart/:bodypart", (req, res) => {
  console.log("boydpart backend ran");
  const bodypart = req.params.bodypart; // Corrected parameter name
  const sql = "SELECT * FROM exercises WHERE bodypart = ?";
  console.log(bodypart);
  database.query(sql, [bodypart], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
});

// query by extype
app.get("/exercise/extype/:extype", (req, res) => {
  console.log("extype backend ran");
  const extype = req.params.extype; // Corrected parameter name
  const sql = "SELECT * FROM exercises WHERE extype = ?";
  console.log(extype);
  database.query(sql, [extype], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
});

// delete request
app.delete("/exercise/:id", async (req, res) => {
  try {
    console.log(req.body.objImagePath);
    console.log(req.body.objTitle);
    console.log(req.params.id);
    let cardID = req.params.id;

    let sqlSel = `SELECT * FROM exercises WHERE id = ?`;

    database.query(sqlSel, [cardID], async (err, result) => {
      if (err) return console.log(err.message);
      const imagepath = result[0]?.imagepath;
      const params = {
        Bucket: bucketName,
        Key: imagepath,
      };

      try {
        const deleteCommand = new DeleteObjectCommand(params);
        await s3.send(deleteCommand);
        console.log(`Object ${imagepath} successfully deleted from S3`);
      } catch (error) {
        console.error("Error deleting object from S3:", error);
      }
    });

    const sqlDlt = `DELETE from exercises where id = ?`;

    database.query(sqlDlt, [cardID], (err) => {
      if (err) return console.error(err.message);
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
