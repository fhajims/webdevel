#!/bin/bash
echo "Evil 4: (Re-)Start Static Python Server"

echo " * List running team-3, i.e. port 7003, Py-Server process id:"
#ssh evil "ps x|grep [p]ort-7003"
ssh evil "ps x|grep [p]ort-7000"

echo " * Kill running Evil-Server:"
ssh evil "ps x|grep [p]ort-7000|cut -d ' ' -f3 |"
# if process ids available, kill process:
ssh evil "ps x|grep [p]ort-7000|cut -d ' ' -f3 |xargs kill -9"

echo " * Start running Evil-Static-Python Server:"
ssh evil 'nohup python3 -m http.server 7000 -d /home/debian/evil-server-for-port-7000/provide-malicious-code 1>/dev/null 2>/dev/null  &'

echo " * List running team-3, i.e. port 7003, Py-Server process id:"
#ssh evil "ps x|grep [p]ort-7003"
ssh evil "ps x|grep [p]ort-7000"



echo " * Done"