#!/bin/bash

echo "Running the Performance Metering Demo (located in directory 'webapp')"

command -V python3 || {
  echo "Error: Python 3 installation missing. Please install python3 binary (for the one-liner-static-server) and try again."
  exit -1
}


echo "Note, after we start the static Python3 server (python3 -m http.server 8000 --directory webapp)..."
echo "Stop with 'killall Python'."
echo "You might get any static resources with 'curl localhost:8000/'. Not try in url 'http://localhost:8000' in browser!"

npm run serve

echo "Done!"