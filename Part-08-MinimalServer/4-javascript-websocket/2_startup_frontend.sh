#!/bin/bash
if [ ! -f "server.js" ];then
    echo "No JavaScript server 'server.js' available. Have you build the server with './1_install_and_build.sh'"
    exit 1
fi 
echo ""
echo " - - - - "
echo "We start up the server at port 5000,"
echo ""
echo " Notes:"
echo "    Check out the static HTML page with 'curl http://localhost:5000/'"
echo "    or better 'open http://localhost:5000/' in your browser to allow the web page to talk via web sockets...'"
echo ""
echo "  If you have Python3 and module websocket (pip3 install six websocket-client) ready,"
echo "    see: https://websocket-client.readthedocs.io/en/latest/getting_started.html "
echo "    then check the websocket connection with the Python3 tool 'wsdump.py' provided in this directory"
echo '    ./wsdump.py ws://localhost:5000/ -t "{\"info\":\"hi\"}"'
echo " - - - - "
node ./server.js 