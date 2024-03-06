import http from "http";
import fs from 'fs';

import {startupTheWebSocketServer} from './ws/wsserver'
import { RequestListener } from "node:http";
// const wsserver = require('./ws/wsserver.js')


export function startup(config:any){

	// this far too SIMPLE callback 
	// will return SOME static files 
	// (with proper content type)
	function callback(request:http.IncomingMessage, response:http.ServerResponse) {
		console.log(" A client request url '"+request.url+"'");
		var currURL = request.url ?? "/";
		if (currURL == "/" ){ currURL = "/index.html"}
		
		var suffix = currURL.split(".").pop()
		var contenttype="text/plain"
		switch(suffix){
			case "html":
				contenttype = "text/html"; break;
			case "js":
				contenttype = "application/javascript"; break;
			default:
				contenttype = "text/plain"; break;
		}
		
		var filename=config.staticdir+currURL
		fs.readFile(filename,function(err,data){
			if (!err){
				response.writeHead(200, "OK Node", {"content-type": contenttype+"; charset=utf-8"});
				response.end(data)			
			}else{
				response.writeHead(404, "File Not found", {"content-type":"text/plain; charset=utf-8"});
				response.end("We could not find file "+filename)
				console.log("ERROR reading file '"+filename+"': "+err)
			}
		})
		
	}
	
	var server= http.createServer(callback).listen(config.server_port);
	console.log("The Webserver is now running on port '"+config.server_port+"'...");
	
	// later web socket server:
	startupTheWebSocketServer(server,config)

}
