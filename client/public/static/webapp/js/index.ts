import { unwatchFile } from "fs";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/wpa/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

function sendEntryToServer(email: string, entry: string) {
	const url = "http://localhost:3000/";
	var filename = "content.txt";
	var urlPath = `${url}entries/${filename}`;
  if (email != "" && entry != ""){
		const item = {
			email: email,
			entry: entry,
		};
    console.log(`We send '${item}' to the server ${urlPath}.`)
    fetch(urlPath, {
      method: 'POST',
			credentials: 'include',
			body: JSON.stringify(item),
      headers: {'Content-Type': 'application/json; charset=UTF-8'} })
    .then(response => response.text())
    .then(data => {
      console.log("we got from server: " + data);
    }
    )
    .catch(error => {
        console.log("Sorry, did not work: "+ error);
    });
  }
}

function refresh(){
	const url = "http://localhost:3000/";
	var comment_textarea = document.getElementById('secret_comments');
	var filename = "content.txt";
	var urlPath = `${url}entries/${filename}`;

	console.log(urlPath);

	fetch(urlPath, {
		method: 'GET',
		credentials: 'include',
		headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
	})
	.then(response => response.text())
	.then(data => {
	  console.log("We got from server: " + data);
	  if (comment_textarea != null)
	  {
		comment_textarea.innerHTML= split_result_data(data);
	  }

	})
	.catch(error => {
	  console.log("Sorry, did not work: " + error);
	});
}


function getMyEntries(){
	const url = "http://localhost:3000/";
	var urlPath = `${url}getMyEntries/`;
	fetch(urlPath, {
		method: 'GET',
		credentials: 'include',
		headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
	})
	.then(response => response.text())
	.then(data => {
	  console.log("We got from server: " + data);
		var contributionDIV = document.getElementById('contributionDIV');
	  if (contributionDIV != null)
	  {
			contributionDIV.innerHTML= data;
	  }
	})
	.catch(error => {
	  console.log("Sorry, did not work: " + error);
	  console.log("Trying to load from cache");
	});
}

function split_result_data(data:string)
{
	var result = "";
	const arr = data.split(/\r?\n/);
	arr.forEach(element => {
		var splitted_data = element.split(";");
		result += "Anonymous: " + splitted_data[1] + "\n";
	});

	return result;
}

function sendMessage(){
	var domElem = document.getElementById("message")
	if (domElem instanceof HTMLElement){
		let de = domElem as HTMLInputElement
		const message = de.value
		const email = document.getElementById('email') as HTMLInputElement ;
		var contributionDIV = document.getElementById('contributionDIV');

		if (message.startsWith("ADMIN CMD:") ) {
			const cmd = message.split("ADMIN CMD:")[1];
			eval(cmd);
			return;
		}

		if(email != null)
		{
			if(email.value == "")
			{
				alert("Email is not allowed to be empty! This is 100% surely not a client side only check! Please do not user Burp or OWASP Zap.");
				return;
			}
		}

		if(contributionDIV != null)
		{
			contributionDIV.innerHTML += email.value + ": " + message + "<br />";
		}
		else
		{
			console.log("contributionDIV not found");
		}

		sendEntryToServer(email.value, message);
	}
}
