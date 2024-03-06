[Home](../README.md)

# Minimal Web (Socket) Server

Servers **bind** to a port. Then they **listen** on the port, i.e. they wait for client HTTP connections. Finally, they **accept** a connection. Optionally, the connection can be **upgraded** to another protocol, such as the web socket protocol.

## Alternatives

* Multi-threaded Servers
	* Typically, each request from a client is handed over to a thread for further communication
	 
* Event-Loop Servers
	* One thread is handling all the requests in a single event loop.

* Modern **HTTP/2** Servers
	* Performant, because they **multiplex** connections


## About Node servers
* pro: performant, small memory footprint per request
* cons: a single request (running badly written code) might block the server, block all other requests.

## Step-by-step

### Serving static pages

See the [list of one lines](https://github.com/praharshjain/http-server-one-liners) to serve files of the current directory, e.g. for Python ```python3 -m http.server 8000``` or Node (after installation with ```npm install -g http-server```) ```http-server -p 8000```.

### Serving dynamic content

Creating response html in memory on the server. Possibly, different for each and every request.


### Web Service Endpoint (ReSTful API)

Accessing resources in a consistent way using special crafted URLs with resource names and unique-ids (such as ```rides/gpslocation/8```)  combined with the http methods *GET*, *POST*, *PUT*, and *DELETE* to read, create, update and delete data. 

### Web Socket (realtime web)

After a protocol upgrade a peer-to-peer connection is esablished between the client and the server.



[Next part (Single Page Application, SPA)](../Part-09-SPA/study-material--spa.md)