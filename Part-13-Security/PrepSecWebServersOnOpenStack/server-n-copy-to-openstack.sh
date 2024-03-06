#!/bin/bash
server="sb"
homedir="/home/debian"
basedir="server-n"
if [ ! -d ${basedir} ]; then
  echo "Directory '${basedir}' does not exists. Please (re-)run the setup script for directory '${basedir}' and try again."
  exit -1
fi

if [ -d ${basedir}/node_modules ]; then
  echo "Subdirectory node_modules exists and might be large. We deny copy it. Remove the dir and try again."
  exit -2
fi

if [ -d ${basedir}/dist ]; then
  echo "Subdirectory 'dist' exists and might be large. We deny copy it. Remove the dir and try again."
  exit -2
fi

scp -r "${basedir}" "${server}:${homedir}/"

# Note: 
# The webapp is not included so far, we need to link it
# On server start, we set a soft link to /home/debian/webapps-wa/dist/webapp in public/static"
# see package.json npm run linkwebapp

echo "Done!"
echo "Now open the terminal on the server ('ssh ${server}') and startup the server with 'cd ${homedir}/${basedir} && chmod +x *.sh && ./setup.sh && sudo ./run.sh'" 