#!/bin/bash

echo "Installing required dependencies (node modules)"
npm install


# compile TypeScript for the web page logic 
tsc public/js/main.ts

echo "Running the broken path traversal demo server"
# optional: set other port and run
# SERV_PORT=9878 npm run dev 
npm run dev

# not reachable