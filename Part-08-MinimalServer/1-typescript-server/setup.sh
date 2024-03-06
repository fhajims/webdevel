#!/bin/bash
basedir="minimal"
if [ -d ${basedir} ]; then
  echo "Directory '${basedir}' already exists. Cowardly refusing to overwrite anything. Please (re-)move the directory '${basedir}' and try again."
  exit -1
fi

mkdir -p "${basedir}"
echo "Initialasing a minimal server in subdir ${basedir}"

echo "A first README.md markdown file has been created in advance. We copy this one. Please update!"
cp templates/README-md-template.txt "${basedir}/README.md"

echo "A package.json file has been created in advance with 'npm init'. We copy this one."
cp templates/package-json-template.txt "${basedir}/package.json"

echo "A gitignore-file has been created in advance. We copy this one."
cp templates/dot-gitignore-template.txt "${basedir}/.gitignore"

echo "A tsconfig.json file has been created in advance with npx 'tsc --init'."
echo "  specifically, the outDir has been set to ./dist"
echo "  specifically, the rootDir has been set to ./src"
cp templates/tsconfig-json-template.txt "${basedir}/tsconfig.json"


echo "We scaffold minimal TypeScript source code for the app"
mkdir -p "${basedir}/src/app/tools"
echo "A minimal server file has been created in advance. We copy this one."
cp templates/server-main.ts "${basedir}/src/app/index.ts"
echo "An additional helper functionality for the server in another file has been created in advance. We copy this one."
cp templates/server-helper.ts "${basedir}/src/app/tools/helper.ts"
tree src

echo "We change into the given base directory and init our project with npm init"
cd "${basedir}"
npm install
echo "Optionally, we might upgrade to the latest version of libs with 'npm upgrade'."
# npm upgrade


echo "Note, after we start the development TypeScript server you might get resources with 'curl localhost:8080/'"
echo "Optionally, we could start a local TypeScript - server for development (without building the app) with 'npm run serve'."
# npm run serve

echo "We compile the JavaScript files to typescript using 'npm run build'."
npm run build
tree dist

echo "Note, after we start the production JavaScript server you might get resources with 'curl localhost:8080/'"
echo "Starting the JavaScript server (needs the compiled JS in ./dist folder) with 'npm start'"
npm start


echo "Done!"
# see also: https://bobaekang.com/blog/minimal-typescript-project-setup-for-curious-minds/ 