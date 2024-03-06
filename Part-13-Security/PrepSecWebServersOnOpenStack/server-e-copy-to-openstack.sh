#!/bin/bash
server="sb"
homedir="/home/debian"
basedir="server-e"
if [ ! -d ${basedir} ]; then
  echo "Directory '${basedir}' does not exists. Please (re-)run the setup script for directory '${basedir}' and try again."
  exit -1
fi

scp -r "${basedir}" "${server}:${homedir}/"
echo "Done!"
echo "Now open the terminal on the server ('ssh ${server}') and startup the server with 'cd ${homedir}/${basedir} && chmod +x *.sh && ./setup.sh && ./run.sh'" 