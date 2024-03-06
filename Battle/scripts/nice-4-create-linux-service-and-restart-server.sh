#!/bin/bash
echo "Nice 4: Create linux service and restart the service"

basedir="nice-ts"
basedir_on_server="ts-server-base"

echo " * Creating niceserver.service"
cat <<- EOF > "${basedir}/niceserver.service"
[Unit]
Description=The Nice TypeScript Server
After=network.target
	
[Service]
User=debian
WorkingDirectory=/home/debian/${basedir_on_server}/
Environment=PORT=8080
ExecStart=/usr/bin/node /home/debian/${basedir_on_server}/app/
Restart=always
	
[Install]
WantedBy=multi-user.target
EOF

echo " * Copy niceserver.service to server"
scp "${basedir}/niceserver.service" "nice:/home/debian/${basedir_on_server}/"

echo " * Check files structure on server"
ssh nice "tree ${basedir_on_server}"

echo " * Link the Linux service"
ssh nice "sudo ln -sf /home/debian/${basedir_on_server}/niceserver.service /etc/systemd/system/niceserver.service"
#ssh nice "sudo ls -al /etc/systemd/system/"
ssh nice "sudo cat /etc/systemd/system/niceserver.service"

echo " * We reload the systemctl daemon"
ssh nice "sudo systemctl daemon-reload"

echo " * We start the service"
ssh nice "sudo systemctl restart niceserver"
ssh nice "sudo systemctl status niceserver"

echo " * We try on server to curl a resource from the nice server"
ssh nice "curl localhost:8080 2> /dev/null"

echo " * Any time you can now re(start) the server with: 'ssh nice \"sudo systemctl restart niceserver\"'."
echo "Done"