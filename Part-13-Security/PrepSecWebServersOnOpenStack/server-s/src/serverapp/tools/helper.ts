/* src/app/tools/helper.ts */

import fs from 'fs'
import http from 'http'

import { broadcastInfoToClientWebBrowsers } from '../websock/websocketlogic'

export function composeAnswerMessage(name: string): string {
  return `${new Date()}, ${name}!\n`
}

export function logEverything(req: http.IncomingMessage,logfile:string){
  const data = `${new Date()}: url='${req.url}'`

  // send to all the (currently connected) clients
  broadcastInfoToClientWebBrowsers(data);

  // log into a file
  fs.appendFile(logfile, data+'\n', (err) => {
    if (err) throw err;
    console.log(`'${data}' has been saved to file '${logfile}'.`)
    });
}

