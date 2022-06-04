#!/bin/bash

echo "Installing required dependencies (node modules)"
npm install

echo "Compiling TypeScript"
tsc public/js/main.ts

echo "Running the REST server"
npm run dev
