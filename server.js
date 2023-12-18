const express = require("express");
const cors = require("cors");

require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());

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

app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

app.get("/info", async (req, res) => {
  let APIKey = process.env.API_KEY;
  const apiUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLqhofO-4kYdstIouG7AtMPWUXL1ZwvGSG&key=${APIKey}`;
  const fetchResponse = await fetch(apiUrl);
  const json = await fetchResponse.json();
  res.json(json);
  console.log(json);
});

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`starting server at port ${port}`);
});
