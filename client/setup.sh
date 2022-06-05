#!/bin/bash

echo "Installing dependencies, i.e. node modules and compiling TS to JS"

npm install

echo "Note, after we start the development TypeScript server you might get resources with 'curl localhost/'"

echo "We compile the JavaScript files to typescript using 'npm run build'."
npm run build
