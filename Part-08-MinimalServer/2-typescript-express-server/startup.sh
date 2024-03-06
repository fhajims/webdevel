#!/bin/bash

echo "Setup a mini demo project"

appdir="tsserver"

if [ ! -f ".gitignore" ]; then
	echo "${appdir}" > .gitignore
fi

if [ ! -d "${appdir}" ]; then	
	echo "Cloning, install modules and modify server functionality (once)...."
	git clone https://github.com/andregardi/ts-express.git "${appdir}" 
	cd "${appdir}" && npm install 


	echo "Modify/replace server functionality"

	cat <<-EOF > app/app.ts
		import express = require('express');
		import fs = require('fs');
		const bodyParser = require('body-parser');


		const filePath = '/tmp/data.txt';

		// Create a new express application instance, including parser for post data
		const app: express.Application = express();
		app.use( bodyParser.text() );

		app.get('/random', function (req, res) {  
		  fs.readFile( filePath, (err, data) => {
		      if (err) {
			  	res.send("Provide a "+filePath+" file on server");
			  }else{
			  	var a = Math.floor( Math.random() * data.length);
				var b = Math.floor( Math.random() * data.length);
				var from = Math.min(a,b)
				var to = Math.max(a,b)
				res.send( data.slice(from,to) );
			  }
		  })
		});

		app.post('/upload', function(req, res) {
			console.log("We add '"+req.body+"' to "+filePath)
		    fs.appendFile(filePath, req.body, function (err,data) {
				if (err){
					res.send("Could not append to "+filePath);
				}else{        
					res.send("Data appended to "+filePath)
				}
		    });
		});

		app.listen(3000, function () {
		  console.log('Example app listening on port 3000!');
		});
	EOF

	echo "providing demo data"
	echo "Just plain text demo data" > /tmp/data.txt

else
	echo "Noting to prepare, the server is already set up."
	echo "       Modify 'app.ts' to your needs."
	cd "${appdir}"	
fi


echo "Upload data to your server (will be stored in /tmp/data.txt"
echo " use 'curl -XPOST 127.0.0.1:3000/upload -H \"Content-Type: text/plain\" --data-ascii \"whateveryoulike\"'"

echo "Try out to get some random data 'curl localhost:3000/random' "
echo "Info: stop server with CTRL-C"
npm run dev
# not reachable