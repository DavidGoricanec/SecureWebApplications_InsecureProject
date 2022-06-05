import http from 'http'
import fs from 'fs'

const cfg = require("./config.json")
const logfile = cfg.logfile || "log.txt"

function logEverything(req: http.IncomingMessage){
  const data = `${new Date()}: url='${req.url}'`
  fs.appendFile(logfile, data+'\n', (err) => {
    if (err) throw err;
    console.log(`'${data}' has been saved to file '${logfile}'.`)
    });
}

function serveIndex(req: http.IncomingMessage, res: http.ServerResponse){
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write("Please visit the web page at /static/webapp/index.html ...")
  res.end()
}

function readAndWriteFile(res: http.ServerResponse, contenttype:string, filepath:string){
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404, "File Not found", { "content-type": "text/plain; charset=utf-8" });
      res.end("We could not find file " + filepath);
      console.log("ERROR reading file '" + filepath + "': " + err);
      return
    }

    res.writeHead(200, "OK Node", { "content-type": contenttype + "; charset=utf-8" });
    res.end(data)
    //console.log(data);
  });


}
function serveStatic(url: string, res: http.ServerResponse){
  var suffix = url.split(".").pop() || "txt";
  var contenttype = "text/plain";
  console.log(`For suffix '${suffix}' we set content-typte to '${contenttype}'.`)
  switch (suffix) {
    case "html":
      contenttype = "text/html"
      break
    case "js":
      contenttype = "application/javascript"
      break
    case "css":
      contenttype = "text/css"
      break
    case "json":
      contenttype = "application/json"
      break
    default:
      contenttype = "text/plain"
      break
  }
  res.writeHead(200, { 'Content-Type': contenttype })
  var filename = `public${url}`;
  console.log(`Serving ${filename} (of type ${contenttype}'...`)
  readAndWriteFile(res,contenttype,filename)
}

http
  .createServer((req, res: http.ServerResponse) => {
    // we add logging
    logEverything(req)

    // we rewrite urls
    var currUrl = req.url ?? "/"
    var base = currUrl.split("/")[1]
    if (base == "src") {
      base = "static"
      currUrl = "/static"+currUrl
    }
    console.log(`${currUrl}: base='${base}'`)
    switch (base){
      case "":
        serveIndex(req,res)
        break
      case "static":
        serveStatic(currUrl,res)
        break
      default:
        res.writeHead(404, { 'Content-Type': "text/plain" })
        res.end(`Sorry, no idea how to handle your request for '${currUrl}'`)
    }
  })
  .listen(cfg.port)

console.log(`Server running at port ${cfg.port}... (CRTL-C to stop)`)
