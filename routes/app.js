const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./index.js");
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

routes(app);

app.use(cors())

var server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});