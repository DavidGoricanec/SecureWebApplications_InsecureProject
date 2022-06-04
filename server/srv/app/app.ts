import http = require('http')
import express = require('express');
import fs = require('fs');
import bodyParser = require('body-parser');
var cors = require('cors')

const SERV_PORT = process.env.SERV_PORT ||3000
const baseDir = '.'; // current directory

const app: express.Application = express();

app.use(express.static('public'))

app.get('/entries/:filename(*)', cors(), function (req, res) {  
    const dataPath = baseDir +req.originalUrl
    console.log("Reading from " + dataPath)
    fs.readFile(dataPath , (err, data) => {
      if (err) {
        res.send("Err. Please provide file '" + dataPath + "' on server.");
      }else{
        res.send( data );
      }
    })
});

app.post('/entries/:filename(*)', cors(), function (req, res) {  
  const dataPath = baseDir +req.originalUrl  // req.params["filename"]
  console.log("Saving " + reg.body.email + " + to " + dataPath)
  fs.appendFile("entries/entries.txt", "new data", (err) => {
    if (err) {
      res.send("Err. Please provide file '" + dataPath + "' on server.");
    }else{
      res.send("ok");
    }
  })
});

app.listen(SERV_PORT, function () {
  console.log(`REST server app listening on port ${SERV_PORT}!`);
  console.log(`Check out http://localhost:${SERV_PORT}/`);
});

