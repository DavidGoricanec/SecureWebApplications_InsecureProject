import http = require('http')
import express = require('express');
import fs = require('fs');
import bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');

const SERV_PORT = process.env.SERV_PORT ||3000
const baseDir = '.'; // current directory
const sessionstr = 'eHuAOgpTvXXlYhXaYjTD';
var session_cnt = Math.floor(Math.random()*10000);
var active_sessions: Array<string> = [];

const app: express.Application = express();

app.use(express.static('public'))

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: 'verysecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: oneDay
   },
  genid: function(req) {
    session_cnt++;
    return `${sessionstr}${session_cnt}`;
  },
}))

app.use(cors({credentials: true, origin: 'http://localhost'}))

app.use(express.json());

app.get('/getMyEntries/', function (req, res) {
    const dataPath = baseDir + "/entries/content.txt"
      console.log("Reading from " + dataPath)
      fs.readFile(dataPath , (err, data) => {
        if (err) {
          res.send("Err. Please provide file '" + dataPath + "' on server.");
        }else{
          if(req.sessionID != null) {
            console.log("Trying to restore session data for " + req.sessionID)
            var result = "";
            const arr = data.toString().split(/\r?\n/);
          	arr.forEach(element => {
          		var splitted_data = element.split(";");
              if(splitted_data[2] == req.sessionID) {
                result += splitted_data[0] + ": " + splitted_data[1] + "<br />";
              }
            });
            res.send(result);
        }
      }
    })
});

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
  const dataPath = baseDir +req.originalUrl
    console.log("SessionID " + req.sessionID + " - Saving entry from" + req.body.email + " + to " + dataPath)
    const sanitzedEmail = req.body.email.replace(/;/g, '')
    const sanitzedSession = req.sessionID.replace(/;/g, '');
    fs.appendFile(dataPath, `${sanitzedEmail};${sanitzedEntry};${sanitzedSession}\n`, (err) => {
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
