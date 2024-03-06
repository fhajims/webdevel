// host = hostname:port
var url = window.location.protocol + "//" + window.location.host + "/info/math";
var urlInp = document.getElementById("url");
var sendButton = document.getElementById("sendButton");
if (sendButton instanceof HTMLButtonElement) {
    sendButton.onclick = sendTheMessage;
}
// Logging on the User Interface
var logElem = document.getElementById("log");
function uilog(msg) {
    if (logElem instanceof HTMLTextAreaElement) {
        logElem.innerHTML = new Date().toLocaleTimeString() + ": " + msg + "\n" + logElem.innerHTML;
    }
}
function sendTheMessage() {
    if (urlInp instanceof HTMLInputElement) {
        var modifiedURL = urlInp.value;
        uilog("We send '" + modifiedURL + "' to the server " + url + ".");
        fetch(modifiedURL, {
            method: 'GET',
            headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
        })
            .then(function (response) { return response.text(); })
            .then(function (result) {
            console.log("we got from server: " + result);
            uilog(" OK. Done. Server responded with: " + result + ".");
        })["catch"](function (error) {
            uilog(" Sorry. Err " + error);
            console.log("Sorry, did not work: " + error);
        });
    }
}
uilog("Click to send messages to the server");
