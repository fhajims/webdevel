#!/bin/bash
echo "serve the web application on a static server"
echo "... in a moment, try 'http://localhost:8080/'... "
python3 -m http.server 8080 -d dist/webapp/