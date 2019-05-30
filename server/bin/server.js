var app = require('../app');
var os = require("os");
var colors = require("colors");

app.set('port', process.env.PORT || 3000);
var port = app.get("port");

app.listen(app.get("port"), (req, res) => {
    console.log("\nServer running...".green);
    console.log("Server on : ".green, os.type().red)
    console.log(`Server on port: ${port}`.green);

});



