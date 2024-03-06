#!/bin/bash
echo "We startup a server to allow you view files at http://localhost:8000/"
ruby -run -ehttpd . -p8000
#python3 -m http.server -d . 8000
