var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('www'));

var fs = require("fs");

var open=require("open");

var i=0;

var timeleft=5000;

app.get('/check', function (req, res) {
   timeleft=5000;
   res.send('ok');
})

setInterval(function(){
	timeleft-=1000;
	if(timeleft<=0){
		process.exit();
	}
},1000);

app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       firstname:req.body.firstname
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

open('http://127.0.0.1:8081/');