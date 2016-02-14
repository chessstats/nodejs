var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const spawn = require('child_process').spawn;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('www'));

var fs = require("fs");

var open=require("open");

var i=0;
var period=100;
var r=150;
var center=150;

var timeleft=5000;

app.get('/check', function (req, res) {
   timeleft=5000;
   var fish = fs.readFileSync('www/fish.svg').toString();
   //console.log("fish:"+fish)
   str=fish;
   var omega=-i/period*2*Math.PI;
   var deg=-i/period*360;
   var s=Math.sin(omega);
   var c=Math.cos(omega);
   var dx=r*c+center;
   var dy=r*s+center;
   //console.log("dx "+dx+" dy "+dy+" deg "+deg);
   str=str.replace('<g id="trans"','<g id="trans" transform="translate('+dx+' '+dy+')"')
   str=str.replace('<g id="rot"','<g id="rot" transform="rotate('+(deg-90)+' 60 60)"')
   res.send(str);
   var pref="";
   if(i<10){
    pref="0"
   }
   if(i<period){
    fs.writeFileSync("c:/unzip/pngs/"+pref+i+".svg",str)
    }
   i++;
})

setInterval(function(){
	timeleft-=200;
	if(timeleft<=0){
		process.exit();
	}
},200);

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

//open('http://127.0.0.1:8081/');

const ls = spawn("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", ['--kiosk','http://127.0.0.1:8081/']);