#!/bin/bash
echo "Nice 2: Create local TypeScript server (to be compiled to JavaScript)"

TEAM=3
basedir="nice-ts"
if [ -d ${basedir} ]; then
  echo "Directory '${basedir}' already exists. Cowardly refusing to overwrite anything. Please (re-)move the directory '${basedir}' and try again."
  exit -1
fi

mkdir -p "${basedir}"

echo " * Creating README.md"
cat <<- EOF > "${basedir}/README.md"
# Team ${TEAM} Type Script Server 

## Development
* startup local on notebook: npm run serve

## Run on server
* startup on Linux server: sudo systemctl restart niceserver

## About
* 202x, by 
EOF

echo " * Creating package.json"
cat <<- EOF > "${basedir}/package.json"
{
  "name": "nice-ts-server-for-team-${TEAM}",
  "version": "1.0.0",
  "description": "Minimal TypeScript Server",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/typescript/bin/tsc --build",
    "serve": "ts-node ./src/app/",
    "start": "node ./dist/app",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "fhj-ims",
  "license": "ISC",
  "dependencies": {
      "jshint": "^2.13.6"
    },
    "devDependencies": {
        "@types/node": "^17.0.21",
        "ts-node": "^10.9.0",
        "typescript": "^5.0.2"
    }
}
EOF

echo " * Creating git ignore file"
cat <<- EOF > "${basedir}/.gitignore"
node_modules
tmp
dist
.DS_Store
EOF


echo " * Creating typescript compiler options"
cat <<- EOF > "${basedir}/tsconfig.json"
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */
    "target": "es5",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
EOF

echo " * We scaffold minimal TypeScript source code for the nice server app"
mkdir -p "${basedir}/src/app/tools"

cat <<- EOF > "${basedir}/src/app/index.ts"
import http from 'http'
import { composeAnswerMessage } from './tools/helper'

http
  .createServer((req, res: http.ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.write( composeAnswerMessage('It works'))
    res.end()
  })
  .listen(8080)

console.log('Server running at port 8080')
EOF

cat <<- EOF > "${basedir}/src/app/tools/helper.ts"
export function composeAnswerMessage(name: string): string {
  return new Date()+" "+name+"!\n"
}
EOF

echo " * The final app structure is:"
tree "${basedir}/"
echo "Done"
