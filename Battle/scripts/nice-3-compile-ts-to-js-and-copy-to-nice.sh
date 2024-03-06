#!/bin/bash
echo "Nice 3: Compile TypeScript to JavaScript (locally on your notebook), then copy to nice"

basedir="nice-ts"
basedir_on_server="ts-server-base"

echo " * We install necessary libraries (node modules)"
cd "${basedir}"
npm install

echo " * We build the server (compile TS -> JS) int folder 'dist/'."
npm run build
echo " * We got with 'tree ${basedir}/dist/ following JavaScript app structure:"
tree nice-ts/dist/
echo " * feel free to start the server on your notebook: "
echo "   first 'cd ${basedir}', then:"
echo "   for development-version (with ts-node) run 'npm run serve' "
echo "   for production-version (js in dist/ folder) run 'npm start'"
echo "   and try with 'curl localhost:8080'."

echo " * We copy the JavaScript Server to the Linux instance 'nice' on OpenStack"
scp -r "./dist/" "nice:/home/debian/${basedir_on_server}"

# check
echo " * Finally, we find following JavaScript server structure on 'nice':"
ssh nice "tree ~/${basedir_on_server}"