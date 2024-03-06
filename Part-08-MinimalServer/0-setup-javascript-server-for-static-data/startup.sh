#!/bin/bash
# Script to setup node server with express and web socket connection

server_base_dir="/tmp/myserverproject"
server_port=8000


# # # # #  DO NOT CHANGE ANYTHING BELOW THIS LINE # # # # 
curr_dir=`pwd` # remember current script directory

echo "Initialise and run a node web server. (to start over, just remove 'rm -rf \"${server_base_dir}\"')"

echo "1 We check requirements:"
echo -n "  1a Node is available at: "
command -v node || {
	echo 'ERROR node is required. Please install node then try again.'
	exit 1
}

echo "2 We check the myserverproject base directory at location '${server_base_dir}':"
if [ -d "${server_base_dir}" ]; then 
	echo "  2a Server base directory already exists at '${server_base_dir}')."
	echo "  2b Nothing to do." 
else
	echo "  2a Server base directory created at '${server_base_dir}' and linked to myserverproject."
	mkdir -p "${server_base_dir}"
	echo "  2b we ignore the node_packages for upcoming git commit/push."
	echo "node_packages" > "${server_base_dir}/.gitignore"
fi
echo "  2c (re-)linking base directory '${server_base_dir}' to local 'myserverproject'."
ln -fs "${server_base_dir}" ./myserverproject

echo "3 Initialising myserverproject server directory:"
if [ -f "myserverproject/package.json" ]; then
	echo "  3a myserverproject/package.json already exists. nothing to do."
else
	echo "  3a To initialsing the directory use 'npm init',"
	echo "     and install required packages:"
	echo "                                  'npm install config'"
	echo "                                  'npm install express'"
	echo "     or just copy the template to create a 'package.json' file."
	cp package.json_template myserverproject/package.json
fi	

echo "4 install all required node packages with 'npm install'..."
cd myserverproject
npm install
cd "${curr_dir}"


echo "5 Create node web server code (including a configuration)"
if [ -f "myserverproject/server.js" ]; then
	echo "  5a myserverproject/server.js already exists. nothing to do."
else
	echo "  5a To create the web server logic, we create a java script file 'server.js'."
	cat <<-EOF > myserverproject/server.js
	#!/usr/bin/env node
	var http = require('http');
	const config = require('config');
	const port = config.get('port') || 8000; 

	callback = function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  res.end('<html><head><title>Node Web Server</title></head><body>It works</body></html>');
	}
	http.createServer(callback).listen(port);

	console.log('Server running at http://127.0.0.1:'+port+'/');
	EOF
fi	

if [ -f "myserverproject/config/production.json" ]; then
	echo "  5b myserverproject/config/production.json already exists. nothing to do."
else
	echo "  5b Creating configuration in file 'myserverproject/config/production.json'..."
	mkdir -p myserverproject/config 
	cat <<-EOF > myserverproject/config/default.json
	{
	  "port":${server_port}
    }
	EOF
fi

echo "6 We change to the app directory and startup the server with 'npm start'..."
cd myserverproject
npm start
echo "  6a wait a bit to let the server start up..."
sleep 2
echo -n "  6b We check if the server responds with some data: "
curl 127.0.0.1:${server_port} || { 
		echo "Sorry, we could not get data from the server. Start the server, then try again"
		exit 1
}

if [ "$(uname)" == "Darwin" ]; then
	echo "...Note: Open browser as client with \"open http://127.0.0.1:${server_port}\"."
	open http://127.0.0.1:${server_port}
elif [ "$(uname)" == "Linux" ]; then
	echo "...Note: Check out in \"verbose\" mode, if everything works with \"curl -v 127.0.0.1:${server_port}\""
else
	echo "...Note: WARN: No idea how to check the server on your operating system"
fi

echo "7 We return back to originial directory '${curr_dir}'."
cd "${curr_dir}"

echo ""
echo "Info: you might kill the node server with 'killall node'."
echo "Done"
