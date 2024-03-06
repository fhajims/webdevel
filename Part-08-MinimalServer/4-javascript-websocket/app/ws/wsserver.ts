import http from 'http'
// the logic for the web socket server:

class ClientConnection {
	static counter = 0;
	client:WebSocket;
	number:number;
	constructor(client:WebSocket) {
		this.client=client;
		this.number=ClientConnection.counter++;
	}
	about():string {return `This is client no ${this.number}`; } 	
}

var clients: Array<ClientConnection>=[]

import WebSocket from 'ws'

export function startupTheWebSocketServer(baseHttpServer:http.Server, config:any){
		
	console.log("   * Web Socket server will be set up in a moment...")
	var wsServer = new WebSocket.Server({ server: baseHttpServer});
	
	var url="ws://localhost:"+config.server_port
	console.log("   * You might test the web socket server with: wsdump.py "+url+" -vv")
	
	var ClientCnt = 1
	console.log("   * Waiting for the first client to connect...")
	wsServer.on('connection',
		wsClient => {
			const currClient = new ClientConnection(wsClient)
			const currNo = currClient.number
			console.log("   * Client %d is connected. Waiting for messages...", currNo)
			console.log( currClient.about() )
			var infomsg_to_client = {
				 		"WS-INFO": "Welcome. Send me any message you like in the format {\"info\":\"msg\"}..."
				 	}	
			wsClient.send( JSON.stringify(infomsg_to_client))
			clients.push(currClient)
			wsClient.on('message', message => {
				console.log(" Client sent message '%s'. We reply to all...", message);
				try {
					var msg = JSON.parse(message.toString() )
				}catch(err){
					var errmsg = "   * WebSocketServer-WARN: We cannot JSON parse message '"+message+"'. Please reformat {'info':'msg'}!";
					console.log(errmsg);
					console.info(message);
					console.info(err);
					wsClient.send( JSON.stringify(errmsg) );
					return;
				}

				// we expect JSON message: { info: "with a text message"}
				console.log("   * WebSocketServer-DEBUG: received info: '"+ msg.info+"'")
				const responseMsg:string = msg.info.toUpperCase()
				console.log(" We reply to all %d clients with '%s'...", clients.length, responseMsg);
				var infomsg_to_client = {
					"WS-INFO": "Broadcasting '"+responseMsg+"'."
					}
				clients.forEach( cl => {
					cl.client.send( JSON.stringify(infomsg_to_client) )
				})
			wsClient.on('close', () => { 
					console.log("   * Client disconnecting. Currently %d clients." , clients.length)
					clients.splice( clients.indexOf(currClient) , 1) // remove from list
					console.log("   * Client disconnected. Currently %d clients." , clients.length)
					wsClient.close();
				})
			wsClient.on('error', err => {
				console.log("   * Client reports error: '%s'.", err)
			} )
		})
		
	});
	
	wsServer.on('close', () => { 
		console.log("   * Server is closing down.")
	})
	console.log("   * Everything is set up. Done.")

}
