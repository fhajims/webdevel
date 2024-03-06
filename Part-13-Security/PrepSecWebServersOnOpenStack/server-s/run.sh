#!/bin/bash
echo "Startup the server"
#echo ""
#echo "Note, after we start the development TypeScript server you might get resources with 'curl localhost:8080/'"
#echo "Optionally, we could start a local TypeScript - server for development (without building the app) with 'npm run serve'."
#npm run serve

echo "We get rid of old log information"
today=$(date +"%Y-%m-%d--%H-%M--%s")
mv log.txt log-${today}.txt

echo "Note, after we start the production JavaScript server you might get resources with 'curl localhost:8080/'"
echo "Starting the JavaScript server (needs the compiled JS in ./dist folder) with 'npm start'"

echo "Try to access logged information at 'http://sandbox:8787/static/logs' .... "
npm start

