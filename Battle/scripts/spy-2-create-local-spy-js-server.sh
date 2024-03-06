#!/bin/bash
echo "Spy 2: Create local spy.js server"

if [ -f "spy.js" ]; then
  echo "File 'spy.js' (i.e. the JavaScript spy server) already exists. Cowardly refusing to overwrite anything. Please (re-)move the file 'spy.js' and try again."
  exit -1
fi

echo " * Creating typescript server in file 'spy.js'"
cat <<- EOF > "spy.js"
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

EOF

echo " * The JavaScript spy server source:"
cat spy.js

echo "Done"