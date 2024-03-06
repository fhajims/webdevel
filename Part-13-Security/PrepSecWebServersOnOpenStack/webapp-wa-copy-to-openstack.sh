#!/bin/bash

# Should we use ssh or rsync ??
# rsync -av -e ssh --exclude='node_modules' --exclude='dist' webapp-wa sandbox:/home/debian/webapp-wa

server="sb"
homedir="/home/debian"
basedir="webapp-wa/" 


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
echo "Done!"
echo ""
echo "Now open the terminal on the server ('ssh ${server}') and prepare the app (i.e. compile TS to JS) in the base dir with 'cd ${homedir}/${basedir} && chmod +x *.sh && ./setup.sh'" 
echo ""
echo "Note: the server-n will later set a soft link to /home/debian/webapps-wa/dist/webapp in public/static"
echo "      That must of course happen now! Because now the webapps-wa directory is ready to go."
echo ""
echo "Start server-n (as explained after uploading this server)" 
echo "      and then open Firefox, connect to the server ('ssh ${server}/static/webapp')... '" 