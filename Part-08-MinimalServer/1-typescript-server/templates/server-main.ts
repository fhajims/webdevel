/* src/app/index.ts */

import http from 'http'
import { composeAnswerMessage } from './tools/helper'

http
  .createServer((req, res: http.ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.write( composeAnswerMessage('It works'))
    res.end()
  })
  .listen(8080)

console.log('Server running at port 8080')