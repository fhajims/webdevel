#!/bin/bash

echo "Installing required dependencies (node modules)"
npm install


echo "Running the broken XSS demo server"
# optional: set other port and run
# SERV_PORT=9878 npm run dev 
npm run dev

# not reachable