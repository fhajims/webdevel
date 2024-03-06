#!/bin/bash
echo -n "We ask for the demo login password: "
curl -X POST 'http://localhost:3000/info/math' -H 'Content-Type:text/plain' --data "pwd"
echo 
