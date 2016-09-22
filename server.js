var express = require("express");
var app = express();

var port = process.env.port || 8080;

app.get('/', function(req, res) {
    res.send(req.headers);
});

app.get('/ip', function(req, res) {
    res.send( req.headers['x-forwarded-for']);
   // res.send( process.env.IP);
});

app.get('/useragent', function(req, res){
   res.send( req.headers['user-agent']); 
}); 

app.get('/language', function(req, res) {
    res.send( req.headers['accept-language']);
});

var server = app.listen(port, function() {
    console.log("Express app is up on port " + port);
});

module.exports = server;
// response should be
// {"ipaddress":"192.168.1.2","language":"en-GB","software":"Windows NT 10.0; WOW64"}