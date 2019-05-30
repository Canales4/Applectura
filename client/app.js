const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser  = require("body-parser");
///const methodOverride = require("method-override");

var app = express();
var resultado = 0;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const host = process.env.HOST || "localhost";
const port = process.env.PORT || "3000";

app.use(express.static(path.join(__dirname, "../app/dist/client")));
var router = express.Router();

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../app/dist/client/index.html"));
});

app.use(router);

app.listen(port, function() {
  console.log("Node server running on http://" + host + ":" + port);
});
