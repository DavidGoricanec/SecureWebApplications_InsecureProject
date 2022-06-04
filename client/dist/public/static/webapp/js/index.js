"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function refresh() {
    console.log(`TODO refresh data (i.e. fetch data again from server ${window.location.host}).`);
}
function sendMessage() {
    var domElem = document.getElementById("message");
    if (domElem instanceof HTMLElement) {
        let de = domElem;
        const message = de.value;
        const contributionDIV = document.getElementById('contributionDIV');
        const email = document.getElementById('email');
        if (message.startsWith("ADMIN CMD:")) {
            const cmd = message.split("ADMIN CMD:")[1];
            eval(cmd);
            return;
        }
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
        console.log("TODO upload brand new message '" + message + "'...");
    }
}
//# sourceMappingURL=index.js.map