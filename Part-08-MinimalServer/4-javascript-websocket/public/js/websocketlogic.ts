// the logic for the web socket server:
var url="ws://"
if (window.location.protocol=="https:"){
	url="wss://"
}
url += window.location.host // host = hostname:port
var websockconn:any = null



function connect(){


	if (websockconn){
		uilog("We are already connected."); 
		return
	} 

	uilog('We set up the web socket connection to "'+url+'"');
	websockconn = new WebSocket(url);

	if (websockconn instanceof WebSocket){
		let ws = websockconn as WebSocket 

		ws.onopen = function() {
			uilog('We are connected to web socket server at '+url);
			var msg = { "info": (new Date()).toString() }
			ws.send( JSON.stringify(msg) )
		}

		ws.onmessage = function (evt:any) {
			uilog("We got message: '"+evt.data+"' from the Node webserver.");
		}

		ws.onclose = function(){ 
			websockconn = null
			uilog("Connection is closed."); 
		};

	}else{
		uilog("ERROR: We expect the variable to be of Type WebSocket (or null) ");
	}
}


// Send md5 hash text data via web socket protocol to the server
function sendMessage(){
	if (websockconn instanceof WebSocket){
		let ws = websockconn as WebSocket 
		var domElem = document.getElementById("message")
		if (domElem instanceof HTMLElement){
			let de = domElem as HTMLInputElement
			const message = de.value
			uilog("Sending hash data '"+message+"'")
			var msg = { "info": message }
			ws.send( JSON.stringify(msg) )
			}
	}else{
		uilog("We cannot send. Connection is closed. Reconnect first!");
	}
}


// Logging on the User Interface
var logElem=document.getElementById("log")
function uilog(msg:string){
	if (logElem instanceof HTMLTextAreaElement){
		logElem.innerHTML = new Date().toLocaleTimeString()+": "+msg + "\n" + logElem.innerHTML	
	}
}

uilog("Now click to connect to the web socket server...")
