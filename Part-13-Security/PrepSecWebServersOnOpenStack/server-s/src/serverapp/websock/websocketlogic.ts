/* Web Socket functionality  */

import ws from 'ws';
import { ClientConnection } from  './wsClientCon/ClientConnection'

var clients: Array<ClientConnection>=[]

export const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', (socket:WebSocket) => {
  socket.onmessage = message => console.log(message) ;
  socket.send("Welcome from the server. Connection set up.")
  socket.send("Leaked data will be sent to you as soon as it is posted to the server.")
  
  const currClient = new ClientConnection(socket)
	const currNo = currClient.number
  clients.push(currClient)
  socket.onclose = () => { 
    console.log("   * Client disconnecting. Currently %d clients." , clients.length)
    clients.splice( clients.indexOf(currClient) , 1) // remove from list
    console.log("   * Client disconnected. Currently %d clients." , clients.length)
    socket.close();
  }
});

export function broadcastInfoToClientWebBrowsers(message: string) {
    clients.forEach(cl => {
      cl.client.send(message);
    });
}