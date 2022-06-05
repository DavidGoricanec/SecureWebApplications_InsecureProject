#!/bin/bash
echo "Startup the server"
echo ""
#echo "Note, after we start the development TypeScript server you might get resources with 'curl localhost/'"
#echo "Optionally, we could start a local TypeScript - server for development (without building the app) with 'npm run serve'."
#npm run serve

echo "Note, after we start the production JavaScript server you might get resources with 'curl localhost:'"
echo "Starting the JavaScript server (needs the compiled JS in ./dist folder) with 'npm start'"
npm start
