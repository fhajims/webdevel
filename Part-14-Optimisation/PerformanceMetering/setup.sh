#!/bin/bash

echo "Installing the dependencies for Performance Metering Demo (located in directory 'webapp')"

command -V python3 || {
  echo "Error: Python 3 installation missing. Please install python3 binary (for the one-liner-static-server) and try again."
  exit -1
}

echo "We install the nope packages (e.g. tsc, typescript, nodemon) with 'npm install'"

npm install
echo "Optionally, we might upgrade to the latest version of libs with 'npm upgrade'."
# npm upgrade

echo ""
echo "***** **** ****"
echo "In a moment you might open a new console window and start the static Python3 server with './run.sh'."
echo "   Then visit the URL localhost:8000 to view the webapp."
echo "**** **** ****"
echo ""

echo "We start a monitor to copile TypeScript on demand with 'nodemon -e ts --exec tsc webapp' (stop with CTRL-C)."
npm run monitor-code-changes-and-compile


echo "Done!"