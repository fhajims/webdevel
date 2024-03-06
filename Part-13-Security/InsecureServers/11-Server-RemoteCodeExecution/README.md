[Home](../../../README.md), [Up](../README.md)

### Insecure Web Servers and Web Applications

# Remote Code Execution

A very simple, very broken TypeScript (node) server:


## Startup 

* Startup the broken node (express) server


	```
	startup.sh
	```
	
## Details

* Hack into the server with curl, by modifying the http request

	```
	curl -X POST 'http://localhost:3000/info/add' -H 'Content-Type:text/plain' --data "5+6"

	``` 

*Note:* It's easy to get the **admin password**, if you modify the request (body[^1]) and analyse the source code.

- - -
[^1]: Solution: try `pwd`

- - -
		
Find this project at: <https://git-iit.fh-joanneum.at/Feine/omd-web-devel/-/tree/master/Part-13-Security/InsecureServers/11-Server-RemoteCodeExecution>