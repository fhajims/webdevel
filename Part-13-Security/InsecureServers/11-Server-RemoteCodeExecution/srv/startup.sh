#!/bin/bash
echo "Installing required dependencies (node modules)"
npm install

# compile TypeScript for the web page logic 
tsc public/js/main.ts

echo "Running the broken remote execution demo server"
# optional: set other port and run
# SERV_PORT=9877 npm run dev 
npm run dev

# not reachable



# Further info:

# Note on npm run dev:
#  startsup: ts-node-dev --respawn --transpileOnly ./app/app.ts
#    ts-node-dev ... shares Typescript compilation process between restarts. (see https://github.com/wclr/ts-node-dev)
#      --respawn ... Keep watching for changes after the script has exited (see: https://github.com/fgnass/node-dev)
#      --transpileOnly ... skip typechecking (it's faster) (see: https://github.com/TypeStrong/ts-node )
