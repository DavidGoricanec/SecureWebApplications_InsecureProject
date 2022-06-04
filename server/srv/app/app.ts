import http = require('http')
import express = require('express');
import fs = require('fs');
import bodyParser = require('body-parser');

const SERV_PORT = process.env.SERV_PORT ||3000
const baseDir = '.'; // current directory

const app: express.Application = express();

// serving static files for the web frontend
app.use(express.static('public'))

app.get('/entries/:filename(*)', function (req, res) {  
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

app.post('/entries/:filename(*)', function (req, res) {  
  const dataPath = baseDir +req.originalUrl  // req.params["filename"]
  console.log("Saving " + reg.body.email + " + to " + dataPath)

  fs.appendFile("entries/username.txt", "new data", (err) => {
    if (err) {
      res.send("Err. Please provide file '" + dataPath + "' on server.");
    }else{
      res.send("ok");
    }
  })
});

app.listen(SERV_PORT, function () {
  console.log(`Broken server app listening on port ${SERV_PORT}!`);
  console.log(` Now open your browser at http://localhost:${SERV_PORT}/`);
});

