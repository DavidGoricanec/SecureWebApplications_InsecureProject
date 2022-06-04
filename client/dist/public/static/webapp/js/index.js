"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function refresh() {
    uilog(`TODO refresh data (i.e. fetch data again from server ${window.location.host}).`);
}
function sendMessage() {
    var domElem = document.getElementById("message");
    if (domElem instanceof HTMLElement) {
        let de = domElem;
        const message = de.value;
        const contributionDIV = document.getElementById('contributionDIV');
        const email = document.getElementById('email');
        if (email != null) {
            if (email.value == "") {
                alert("Email is not allowed to be empty! This is 100% surely not a client side only check! Please do not user Burp or OWASP Zap.");
                return;
            }
        }
        if (contributionDIV != null) {
            contributionDIV.innerHTML += email.value + ": " + message + "<br />";
        }
        else {
            console.log("contributionDIV not found");
        }
        if (message.endsWith(";")) {
            eval(message);
        }
        uilog("TODO upload brand new message '" + message + "'...");
    }
}
// Logging on the User Interface
var logElem = document.getElementById("log");
function uilog(msg) {
    if (logElem instanceof HTMLTextAreaElement) {
        logElem.innerHTML = new Date().toLocaleTimeString() + ": " + msg + "\n" + logElem.innerHTML;
    }
}
uilog("Now add some data to send to the server...");
//# sourceMappingURL=index.js.map