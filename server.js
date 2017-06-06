var express = require('express');
var app = express();

app.use(express.static(__dirname + "/dist" ));

//app.use(express.static(__dirname + "/modules"));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.listen(process.env.PORT || 3006);
console.log("Server up on port 3006");
console.log(__dirname)