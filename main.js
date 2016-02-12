var http = require("http");
var open=require("open");

var i=1;

http.createServer(function (request, response) {

	console.log(request);
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/html'});
   
   // Send the response body as "Hello World"
   response.end(i.toString()+'<form><input type="submit" value="Submit"><input type="checkbox" name="ischecked" value="ischecked">ischecked</form>\n');
   i++;
}).listen(8081);

open('http://127.0.0.1:8081/');

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');