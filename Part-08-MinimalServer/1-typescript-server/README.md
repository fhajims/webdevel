[Home](../../README.md)

### Secure Web Apps


# Toolchain 

## TL`DR

Fire up a script which prepares a **minimal** TypeScript server setting.

```bash
./setup.sh
```



## Details on the code snippets

Find code snippets about:

#### Scaffold app

```sh
tree src
src
└── app
    ├── index.ts
    └── tools
        └── helper.ts
```

src/app/index.ts

```
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
```


src/app/tools/helper.ts

```
export function composeAnswerMessage(name: string): string {
  return `${new Date()}, ${name}!\n`
}
```


#### Configurations

package.json

```
{
  "name": "minimal-ts-server",
  "version": "1.0.0",
  "description": "Minimal TypeScript Server",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/typescript/bin/tsc --build",
    "serve": "ts-node ./src/app/",
    "start": "node ./dist/app",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "fhj",
  "license": "ISC",
  "dependencies": {
      "jshint": "^2.13.4",
      "tsc": "^2.0.4"
    },
    "devDependencies": {
        "@types/node": "^17.0.21",
        "ts-node": "^10.5.0",
        "typescript": "^4.5.5"
    }
}
```

tsconfig.json

```
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "rootDir": "./src", /* root folder (sources) */
    "outDir": "./dist", /* output folder */
    "strict": true,     /* strict type-checking. */
  }
}
```

.gitignore

```
node_modules

tmp
dist

### macOS ###
.DS_Store
```

#### Run the Scripts

```
npm install
npm run build
npm start
```

```
dist
└── app
    ├── index.js
    └── tools
        └── helper.js

```

#### Request resources from the server

```
curl localhost:8080  
```
	
- - - 

This file can be found at <https://git-iit.fh-joanneum.at/Feine/2020ss-ims19-secwebapps/>	
