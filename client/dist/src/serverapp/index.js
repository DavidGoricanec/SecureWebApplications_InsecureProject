"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const cfg = require("./config.json");
const logfile = cfg.logfile || "log.txt";
function logEverything(req) {
    const data = `${new Date()}: url='${req.url}'`;
    fs_1.default.appendFile(logfile, data + '\n', (err) => {
        if (err)
            throw err;
        console.log(`'${data}' has been saved to file '${logfile}'.`);
    });
}
function serveIndex(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Please visit the web page at /static/webapp/index.html ...");
    res.end();
}
function readAndWriteFile(res, contenttype, filepath) {
    fs_1.default.readFile(filepath, (err, data) => {
        if (err) {
            res.writeHead(404, "File Not found", { "content-type": "text/plain; charset=utf-8" });
            res.end("We could not find file " + filepath);
            console.log("ERROR reading file '" + filepath + "': " + err);
            return;
        }
        res.writeHead(200, "OK Node", { "content-type": contenttype + "; charset=utf-8" });
        res.end(data);
        //console.log(data);
    });
}
function serveStatic(url, res) {
    var suffix = url.split(".").pop() || "txt";
    var contenttype = "text/plain";
    console.log(`For suffix '${suffix}' we set content-typte to '${contenttype}'.`);
    switch (suffix) {
        case "html":
            contenttype = "text/html";
            break;
        case "js":
            contenttype = "application/javascript";
            break;
        case "css":
            contenttype = "text/css";
            break;
        case "json":
            contenttype = "application/json";
            break;
        default:
            contenttype = "text/plain";
            break;
    }
    res.writeHead(200, { 'Content-Type': contenttype });
    var filename = `public${url}`;
    console.log(`Serving ${filename} (of type ${contenttype}'...`);
    readAndWriteFile(res, contenttype, filename);
}
http_1.default
    .createServer((req, res) => {
    var _a;
    // we add logging
    logEverything(req);
    // we rewrite urls
    var currUrl = (_a = req.url) !== null && _a !== void 0 ? _a : "/";
    var base = currUrl.split("/")[1];
    if (base == "src") {
        base = "static";
        currUrl = "/static" + currUrl;
    }
    console.log(`${currUrl}: base='${base}'`);
    switch (base) {
        case "":
            serveIndex(req, res);
            break;
        case "static":
            serveStatic(currUrl, res);
            break;
        default:
            res.writeHead(404, { 'Content-Type': "text/plain" });
            res.end(`Sorry, no idea how to handle your request for '${currUrl}'`);
    }
})
    .listen(cfg.port);
console.log(`Server running at port ${cfg.port}... (CRTL-C to stop)`);
//# sourceMappingURL=index.js.map