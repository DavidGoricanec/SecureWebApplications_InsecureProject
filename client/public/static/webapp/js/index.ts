import { unwatchFile } from "fs";

function refresh(){
	const url = "http://localhost:3000/";
	var comment_textarea = document.getElementById('secret_comments'); 
	var filename = "content.txt";
	var urlPath = `${url}entries/${filename}`;

	console.log(urlPath);

	fetch(urlPath, {
		method: 'GET',
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

		console.log("TODO upload brand new message '"+message+"'...")
	}
}
