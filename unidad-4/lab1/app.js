// Load the http module to create http server
var http = require('http');

var server = http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type" : "text/plain"});
	res.end("Hello PhoneGap\n");
});

// Listen on port 3030, ip default to 127.0.0.1
server.listen(3030);

// put a friendly message on console
console.log("Server runing at http://127.0.0.1:3030/");