#!/bin/bash
echo "Spy 3: Copy server into 'spy-server-port-9000' (a dynamic-server-to-log-data) and set execute permissions"

ssh spy "mkdir -p spy-server-port-9000"

scp ./spy.js spy:/home/debian/spy-server-port-9000/spy.js
ssh spy "chmod +x spy-server-port-9000/spy.js"

# check
ssh spy "tree spy-server-port-9000"
ssh spy "cat spy-server-port-9000/spy.js"
