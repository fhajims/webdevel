#!/bin/bash
echo "Spy 6: Check the logged data on the Spy Server"

ssh spy "tree /home/debian/spy-server-port-9000"
ssh spy "cat ~/spy-server-port-9000/spy.log"

# Check "forever"
# ssh spy "tail -f ~/spy-server-port-9000/spy.log"