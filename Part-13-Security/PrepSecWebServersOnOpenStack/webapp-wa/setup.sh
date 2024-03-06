#!/bin/bash

echo "Installing dependencies, i.e. node modules and compiling TS to JS"

npm install
echo "Optionally, we might upgrade to the latest version of libs with 'npm upgrade'."
# npm upgrade

npm run build
tree dist

echo "Done. Now serve the generated web app somewhere on your servers"
