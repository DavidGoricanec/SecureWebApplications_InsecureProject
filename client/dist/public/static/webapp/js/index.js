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
        const contributionTA = document.getElementById('my_contribution_TA');
        if (contributionTA != null) {
            contributionTA.innerHTML += message + "<br />";
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