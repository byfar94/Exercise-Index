const express = require("express");
const cors = require("cors");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);

app.use(cors());

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.set("view engine", "ejs");

app.get("/info", async (req, res) => {
  let APIKey = process.env.API_KEY;
  const apiUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLqhofO-4kYdstIouG7AtMPWUXL1ZwvGSG&key=${APIKey}`;
  const fetchResponse = await fetch(apiUrl);
  const json = await fetchResponse.json();
  res.json(json);
  console.log(json);
});

app.use(express.static("public"));

app.listen(3000);
