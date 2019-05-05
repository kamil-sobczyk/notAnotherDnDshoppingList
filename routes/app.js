const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./index.js");
const app = express();
const cors = require("cors");

const PORT = 8080;
const HOST = "0.0.0.0";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

routes(app);

app.use(cors());

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
