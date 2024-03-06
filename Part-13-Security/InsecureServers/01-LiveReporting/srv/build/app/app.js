"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws = require("ws");
var bodyParser = require("body-parser");
var app = express();
// serving static files:
app.use(express.static('public'));
app.use(bodyParser.text());
app.get('*', function (req, res) {
    res.send("TODO");
});
app.post('/info/:filename(*)', function (req, res) {
    console.log("We got parameter: " + req.params.filename);
    var data = req.body;
    console.log("We got data we will broadcast to all web socket clients now...  " + data);
    var result = "NOT implemented yet: Saving data '" + data + "'";
    res.send(result);
});
var wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', function (socket) {
    socket.on('message', function (message) { return console.log(message); });
});
console.log('Broken server app listening on port 3000!');
var server = app.listen(3000);
server.on('upgrade', function (request, socket, head) {
    wsServer.handleUpgrade(request, socket, head, function (socket) {
        wsServer.emit('connection', socket, request);
    });
});
