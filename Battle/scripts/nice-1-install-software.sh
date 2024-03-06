#!/bin/bash
echo "Nice 1: Update/Install software"
echo "  Note: we use shortcut 'ssh nice' for 'ssh debian@10.77.23.86 -i  ~/.ssh/id_rsa_10.77.23.86-secweb-3"

ssh nice "sudo apt-get update"
ssh nice "sudo apt-get install tree npm"

# try
ssh nice "uname -a"
ssh nice "ip  -br -4 addr"
ssh nice "id"
ssh nice "tree ~"

# optional, if bash warning: "...cannot change locale..."
#ssh nice "sudo apt-get install locale"
#ssh nice "sudo locale-gen en_GB.UTF-8"
#ssh nice "sudo dpkg-reconfigure locales" # * ...customise with: 140 3