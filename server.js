var express = require("express");
var app = express();

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.send(req.headers);
});

app.get('/ip', function(req, res) {
    res.send( req.headers['x-forwarded-for']);
   // res.send( process.env.IP);
});

app.get('/useragent', function(req, res){
   res.send( req.headers['user-agent'] ); 
}); 

app.get('/language', function(req, res) {
    var lang = req.headers['accept-language'].split(',');
    res.send( lang[0] );
});

app.get('/os', function(req, res) {
    // got no clue how this works
    // credit goes to: http://stackoverflow.com/questions/17779744/regular-expression-to-get-a-string-between-parentheses-in-javascript
    var regExp = /\(([^)]+)\)/;
    res.send( regExp.exec(req.headers['user-agent'])[1] );
});

app.get('/api/whoami', function(req, res) {
   var ipaddress =  req.headers['x-forwarded-for'];
   var language = req.headers['accept-language'].split(',');
   
   var regExp = /\(([^)]+)\)/;
   var software = regExp.exec(req.headers['user-agent'])[1];
   
   res.send({"ipaddress": ipaddress, "language": language[0], "software": software});
});

var server = app.listen(port, function() {
    console.log("Express app is up on port " + port);
});

module.exports = server;
// response should be
// {"ipaddress":"192.168.1.2","language":"en-GB","software":"Windows NT 10.0; WOW64"}