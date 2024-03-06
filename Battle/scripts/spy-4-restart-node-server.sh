#!/bin/bash
echo "Spy 4: (Re-)Start Server"

echo " * List running team-3 Spy-Server process id:"
ssh spy "ps x|grep [s]py"

echo " * Kill running Spy-Server:"
# will work only, if pid found (server is running)
ssh spy "ps x|grep [s]py|cut -d ' ' -f3 |xargs kill -9"

echo " * Start running Spy-Server:"
ssh spy 'nohup ~/spy-server-port-9000/spy.js 1>/dev/null 2>/dev/null &'

echo " * List running team-3 Spy-Server process id:"
ssh spy "ps x|grep [s]py"


echo " * Done"