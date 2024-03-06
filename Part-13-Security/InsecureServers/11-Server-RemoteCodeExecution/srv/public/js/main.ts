// host = hostname:port
var url=window.location.protocol+"//"+window.location.host+"/info/math"


var messageInp = document.getElementById("message") 

var sendButton=document.getElementById("sendButton")
if (sendButton instanceof HTMLButtonElement){
    sendButton.onclick = sendTheMessage
}


// Logging on the User Interface
var logElem=document.getElementById("log")
function uilog(msg:string){
	if (logElem instanceof HTMLTextAreaElement){
		logElem.innerHTML = new Date().toLocaleTimeString()+": "+msg + "\n" + logElem.innerHTML	
	}
}

function sendTheMessage() {
    if (messageInp instanceof HTMLInputElement){
        const msg = messageInp.value
        uilog(`We send '${msg}' to the server ${url}.`)

        fetch(url, {
            method: 'POST',
            body: msg,
            headers: {'Content-Type': 'text/plain; charset=UTF-8'} })
        .then ( response => response.text() )
        .then ( result => {
            console.log("we got from server: "+result)
                uilog(` OK. Done. Server responded with: ${ result }.`)
            } 
        )
        .catch(error => {
            uilog(` Sorry. Err ${error}`)
            console.log("Sorry, did not work: "+ error)
        });
          
    }
}


uilog("Click to send messages to the server")
