export class ClientConnection {
	static counter = 0;
	client:WebSocket;
	number:number;
	constructor(client:WebSocket) {
		this.client=client;
		this.number=ClientConnection.counter++;
	}
	about():string {return `This is client no ${this.number}`; } 	
}
