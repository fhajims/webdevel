#!/bin/bash
echo -n "evaluating JavaScript on the server: 5+6="
curl -X POST 'http://localhost:3000/info/math' -H 'Content-Type:text/plain' --data "5+6"
echo 
echo -n "evaluating JavaScript on the server: 5*6="
curl -X POST 'http://localhost:3000/info/math' -H 'Content-Type:text/plain' --data "5*6"
echo 
