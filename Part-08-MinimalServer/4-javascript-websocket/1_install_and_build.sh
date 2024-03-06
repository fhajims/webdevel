#!/bin/bash
# Mind: chmod +x *.sh 

echo "We install all required (specified in package.json) node packages into folder node_modules."
npm install

echo "We compile all source TypeScript files *.ts to JavaScript (js)..."
npm run build

echo "Done. Now start the server: 'npm start' and open browser at url http://localhost:5000/ ..."