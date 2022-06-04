#!/bin/bash

echo "Installing dependencies, i.e. node modules and compiling TS to JS"

npm install
echo "Optionally, we might upgrade to the latest version of libs with 'npm upgrade'."
# npm upgrade


echo "Note, after we start the development TypeScript server you might get resources with 'curl localhost:8080/'"
echo "Optionally, we could start a local TypeScript - server for development (without building the app) with 'npm run serve'."
# npm run serve

echo "We compile the JavaScript files to typescript using 'npm run build'."
npm run build
tree dist

echo "Note, after we start the production JavaScript server you might get resources with 'curl localhost:8080/'"
echo "Starting the JavaScript server (needs the compiled JS in ./dist folder) with 'npm start'"
# npm start
