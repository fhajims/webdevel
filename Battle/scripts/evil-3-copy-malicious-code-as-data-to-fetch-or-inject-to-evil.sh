#!/bin/bash
echo "Evil 3: Copy malicious code as static data to 'provide-malicious-code'"

scp -R ./evil-code/* evil:/home/debian/evil-server-for-port-7000/provide-malicious-code

# check
ssh evil "tree evil-server-for-port-7000"
echo " * On the server you can find now following source code:"
ssh evil "cat evil-server-for-port-7000/provide-malicious-code/*"
