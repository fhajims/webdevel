### IMS19 Secure Web Applications

# A minimal server (for node)


* TL‘DR:
	* Requirements: Linux, npm 
	* ```startup.sh``` 

	
* Step-by-step

	* Check/install npm: 

	```
	npm version
	``` 

	* Create/move to server base dir
	
	```
	mkdir -p /tmp/minmalserver
	cd /tmp/minmalserver
	```

	* Initialise your project
	
	```
	npm init
	``` 

	* Install required node packages (and store to ```package.json```), e.g. module ```config```:

	```
	npm install config
	```
		
		
	* create a server **server.js** a

	```
	#!/usr/bin/env node
	var http = require('http');
	const config = require('config');
	const port = config.get('port') || 8000; 
	
	callback = function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  res.end('<html><head><title>Node Web Server</title></head><body>It works</body></html>');
	}
	http.createServer(callback).listen(port);
	
	console.log('Server running at http://127.0.0.1:'+port+'/');
	```

* and some configuration **config/default.json**:

	```
	{
	  "port":8000
	}
```
	
	
	* startup the server

	```
	npm start
	```

	* check, if server works

	```
	curl 127.0.0.1:8000
	```

- - -

### More Node.js Server

* How to get started with node and the Express, Koa, Socket.io, Metoro and Loopback frameworks <https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/>


		
Find this project at: <https://git-iit.fh-joanneum.at/Feine/2020ss-ims19-secwebapps>