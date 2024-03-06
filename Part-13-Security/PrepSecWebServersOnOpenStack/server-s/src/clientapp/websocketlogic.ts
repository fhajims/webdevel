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

	//uilog('We set up the web socket connection to "'+url+'"');
	websockconn = new WebSocket(url);

	if (websockconn instanceof WebSocket){
		let ws = websockconn as WebSocket 

		ws.onopen = function() {
			uilog('We are connected to the spy web socket server at '+url);
			var msg = { "info": (new Date()).toString() }
			ws.send( JSON.stringify(msg) )
		}

		ws.onmessage = function (evt:any) {
			uilog(evt.data);
		}

		ws.onclose = function(){ 
			websockconn = null
			uilog("*** WARN ***")
			uilog("Server shut down. Connection is closed. Please, restart the server!"); 
			uilog("*** WARN ***")
		};

	}else{
		uilog("ERROR: We expect the variable to be of Type WebSocket (or null) ");
	}
}

// Logging on the User Interface
var logElem=document.getElementById("log")
function uilog(msg:string){
	if (logElem instanceof HTMLTextAreaElement){
		logElem.innerHTML = new Date().toLocaleTimeString()+": "+msg + "\n" + logElem.innerHTML	
	}
}

// we connect immidiately when the web page is loaded
connect();