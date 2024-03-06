import express = require('express');
import ws = require('ws');
import bodyParser = require('body-parser');
import fs = require ('fs');

const PORT = process.env.PORT || 7777

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



const app: express.Application = express();
// serving static files: for the web frontend
app.use(express.static('public'))

app.use(bodyParser.text());

app.get('/reportleak/:message', function(req,res){
  const data = req.params.message as string
  processLeakedDataReceived(data, res);
})

app.post('/info/:filename(*)', function (req, res) {  
    const data = req.body as string
    processLeakedDataReceived(data, res);
});

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket:WebSocket) => {
 
  socket.on('message', (message:string) => console.log(message));
  socket.send("Welcome from the server. Connection set up.")
  socket.send("Leaked data will be sent to you as soon as it is posted to the server.")
  
  const currClient = new ClientConnection(socket)
	const currNo = currClient.number
  clients.push(currClient)
  socket.on('close', () => { 
    console.log("   * Client disconnecting. Currently %d clients." , clients.length)
    clients.splice( clients.indexOf(currClient) , 1) // remove from list
    console.log("   * Client disconnected. Currently %d clients." , clients.length)
    socket.close();
  })
});

console.log(`Broken server app listening on port ${PORT}!`);
const server = app.listen(PORT) 

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

function processLeakedDataReceived(data: string, res:Response) {
  console.log("We got data. We broadcast " + data + " to all " + clients.length + " web socket clients now...  ");
  const result = "Info: We broadcast '" + data + "' to all available web clients";
  broadcastInfoToClientWebBrowsers(data, result);
  res.send("" + result);
}

function broadcastInfoToClientWebBrowsers(message: string,  result: string) {
  clients.forEach(cl => {
    cl.client.send(message);
  });
}
