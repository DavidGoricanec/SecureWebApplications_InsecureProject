[Home](../../../README.md), [Up](../README.md)


### IN-Secure Web Servers and Web Applications

# Path Traversal

A very simple, very broken TypeScript (node) server:


## Startup 

* Startup the broken node (express) server


	```
	startup.sh
	```
	
## Details

* Hack into the server with curl, by modifying the http request

	```
	curl '127.0.0.1:3000/info/public/pwd.txt'
	``` 

*Note:* It's easy to get the **admin password**, if you analyse the server file structure and the source code.

- - -

		
Find this project at: <https://git-iit.fh-joanneum.at/Feine/omd-web-devel/-/tree/master/Part-13-Security/InsecureServers/12-Server-PathTraversal>