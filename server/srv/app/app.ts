import http = require('http')
import express = require('express');
import fs = require('fs');
import bodyParser = require('body-parser');
var cors = require('cors')

const SERV_PORT = process.env.SERV_PORT ||3000
const baseDir = '.'; // current directory
const sessionstr = 'eHuAOgpTvXXlYhXaYjTD';
var session_cnt = 0;
var active_sessions: Array<string> = [];

const app: express.Application = express();

app.use(express.static('public'))

app.get('/session', cors(), function (req, res) {  
  session_cnt += 1;
  const session = sessionstr + session_cnt;
  active_sessions.push(session);

  console.log("giving out session_id: " +session)
  res.send( session );
});

app.get('/entries/:filename(*)', cors(), function (req, res) {  
    const dataPath = baseDir +req.originalUrl
    if(/*active_sessions.indexOf(req.session) > -1*/ true)
    {
      console.log("Reading from " + dataPath)
      fs.readFile(dataPath , (err, data) => {
        if (err) {
          res.send("Err. Please provide file '" + dataPath + "' on server.");
        }else{
          res.send( data );
        }
      })
    }
    else
    {
      res.send( "Session expired" );
    } 
});

app.post('/entries/:filename(*)', cors(), function (req, res) {  
  const dataPath = baseDir +req.originalUrl  // req.params["filename"]
  if(/*active_sessions.indexOf(req.session) > -1*/ true)
  {  
    console.log("Saving " + reg.body.email + " + to " + dataPath)
    fs.appendFile("entries/entries.txt", "new data", (err) => {
      if (err) {
        res.send("Err. Please provide file '" + dataPath + "' on server.");
      }else{
        res.send("ok");
      }
    })
  }
  else
  {
    res.send( "Session expired" );
  } 
});

app.listen(SERV_PORT, function () {
  console.log(`REST server app listening on port ${SERV_PORT}!`);
  console.log(`Check out http://localhost:${SERV_PORT}/`);
});

