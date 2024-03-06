#!/usr/bin/env node
const LOG="/home/debian/spy-server-port-9000/spy.log";
var http = require('http');
const fs = require('fs');
const ef = (err) => {if (err) {console.log(err);};};
callback = function (req, res) {
fs.appendFile(LOG, new Date() + ": url=" + req.url+" method=" + req.method+ "headers=" + req.rawHeaders,ef);
  if (req.method == 'POST') {
    var body = '';
    req.on('data', function (data) { body += data; });
    req.on('end', function () { fs.appendFile(LOG,body+"\n",ef); });
  } else{ fs.appendFile("spy.log","\n",ef); } ;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<html><head><title>Spy Server</title></head><body>we got headers: '+JSON.stringify(req.rawHeaders)+'</body></html>\n');
}
http.createServer(callback).listen(9000);

