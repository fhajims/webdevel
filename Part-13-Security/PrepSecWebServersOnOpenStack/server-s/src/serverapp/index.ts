/* src/app/index.ts */

// TODO refactor:
//     minimal structure
// TODO add features:
//     ... 

import http from 'http'


import { composeAnswerMessage } from './tools/helper'
import { logEverything} from './tools/helper'
import { serveStatic } from './tools/servestatic'
import { composeCookie} from './tools/cookies'

const cfg = require("./config.json")
const logfile = cfg.logfile || "log.txt"


function serveIndex(req: http.IncomingMessage, res: http.ServerResponse){
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write( composeAnswerMessage('It works. Try out the live dashboard at: /static/dashboard.html'))
  res.end()
}

function routing(req: http.IncomingMessage, res: http.ServerResponse, base:string, currUrl:string){
  switch (base){
    case "":
      serveIndex(req,res)
      break
    case "internal":
      // TODO allow only for some users/groups

      // we add some cookies (unless already set)
      const listOfCookies = composeCookie(req,res)
      res.writeHead(500, ['Content-Type',"text/plain"].concat (listOfCookies) )
      // TODO whatever
      res.end("TODO implement intern")
      break
    case "static":
      serveStatic(currUrl,res)
      break
    default:
      res.writeHead(404, { 'Content-Type': "text/plain" })
      res.end(`Sorry, no idea how to handle your request for '${currUrl}'`)
  }
}

// The main server logic:
const server = http
  .createServer((req, res: http.ServerResponse) => {
    
    // we add logging
    logEverything(req,logfile)
    
    // we rewrite urls
    var currUrl = req.url ?? "/"
    var base = currUrl.split("/")[1]
    if (base == "src") {
      base = "static"
      currUrl = "/static"+currUrl
        // rewrite to find the sources mapped in <file>.js.map
    }
    console.log(`${currUrl}: base='${base}'`)
    
    // we add routing
    routing(req,res, base, currUrl)
  })
  .listen(cfg.port)

console.log(`Server running at port ${cfg.port}... (CRTL-C to stop)`)




// Add web socket functionality:
import { wsServer } from './websock/websocketlogic'

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
