"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var helper_1 = require("./tools/helper");
http_1.default
    .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write((0, helper_1.composeAnswerMessage)('It works'));
    res.end();
})
    .listen(8080);
console.log('Server running at port 8080');
