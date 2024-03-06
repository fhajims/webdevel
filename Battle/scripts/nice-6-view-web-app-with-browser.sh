#!/bin/bash
echo "Nice 6: View in browser"

echo " * open in your browser the url 'http://nice:8080'"

# on mac use the 'open' command
if [ "$(uname)" == "Darwin" ]; then
 open http://nice:8080
fi;

echo "Done"