#!/bin/bash
#  This is file: 2-install-and-compile.sh

echo "Start minimal demo with gRPC"

PROTO_FILE='cracking.proto'

if test -f "${PROTO_FILE}"; then
  echo "We compile the file '${PROTO_FILE}'..."
else
  echo "ERR. Please provide input file '${PROTO_FILE}'. Then try again."
  exit 7
fi


if test -d "node_modules"; then
  echo "We expect the node modules are installed. If you run into troubles, reinstall the modules!"
else
  echo "installing dependencies"
  npm install # everything is configured in package.json
  # Every packages was added to the package.json as (devel-) dependency the following way:
  # npm install --save-dev grpc-tools
  # npm install --save google-protobuf "@grpc/grpc-js" 'minimist'
fi

if test -f ".gitignore"; then
  echo "Check your .gitignore to ignore node_modules!"
else
  echo "node_modules" > .gitignore
  echo "gen" >> .gitignore
fi

mkdir -p gen
./node_modules/grpc-tools/bin/protoc.js \
  --js_out=import_style=commonjs,binary:./gen/ \
  --grpc_out=grpc_js:./gen "${PROTO_FILE}"


chmod +x *.js

echo "** "
echo "   In a moment try out to execute the client './cracking_client.js'"
echo "** "
echo "We start up the cracking server. CTRL-C to stop"
./3-cracking_server.js 