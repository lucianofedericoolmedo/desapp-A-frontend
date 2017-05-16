var express = require('express');
var app = express();

app.use(express.static(__dirname + "/app"));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.listen(process.env.PORT || 3006);
console.log("Server up on port 3006");
console.log(__dirname)