const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


var fs = require('fs'); //require filesystem module

var port = 8080;

var SerialPort = require("serialport");
var arduinoCOMPort = "/dev/ttyACM0";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, 
	{baudRate: 9600}  );

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

app.get('/', function (req, res) {
   handler (req, res);
})

app.get('/action', function (req, res) {
   var action = req.params.action || req.param('action');
   //change string to int
   console.log(action); 
   arduinoSerialPort.write(parseInt(action));
   res.send('finish');
});

app.listen(port, function () {
   ///記得將此檔案以UTF-8格式存檔，否則下面之輸出會是亂碼
   console.log("http伺服器已在"+port+"埠口啟動");  
});

process.on('SIGINT', function () { //on ctrl+c
  console.log('Process is terminated');
  process.exit(); //exit completely
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("disconnect", () => {
    console.log("a user go out");
  });

});

function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/index.html', 
	  function(err, data) { //read file index.html in public folder
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
		res.write(data); //write data from index.html
		return res.end();
      }
  );
}
