### IMS19 Secure Web Applications

# TypeScript (TS) server

A very simple type script node server based on the code [ts-express](https://github.com/andregardi/ts-express):


* TL'DR

	```
	startup.sh
	```
	
* Details

	* clone ```git clone https://github.com/andregardi/ts-express.git ```
	* install dependencies ```npm install```
	* run ```npm run dev```
	* try it out: ```curl 127.0.0.1:3000```


* TODO: Add functionality to upload data and retrieve random data
	* Get random data ```curl 127.0.0.1:3000/random```
		* Add code to app.ts
		
		```
		app.get('/random', function (req, res) {
  			res.send('TODO-Random!');
		});
		```
		
	* Append data, e.g. POST images ```curl -XPOST 127.0.0.1:3000 --data-binary @"image.png"```



* Example upload/download for plain data:
	* use parser for request 

	```
	const bodyParser = require('body-parser');
	...
	app.use( bodyParser.text() );
	```
	
	* return (random) parts of data ```curl 127.0.0.1:3000/random```

	```
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
	```
	 
	* upload more data e.g. ```curl -XPOST 127.0.0.1:3000/upload -H "Content-Type: text/plain" --data-ascii "whateveryoulike"```

	```
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
	```

Note: it is now up to you to secure this data with input validation, CORS headers and so on and so forth.


- - -


### Optional / Alternatives / Selected Links

* How to get started with node and the Express, Koa, Socket.io, Metoro and Loopback frameworks <https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/>



- - -

		
Find this project at: <https://git-iit.fh-joanneum.at/Feine/2020ss-ims19-secwebapps>