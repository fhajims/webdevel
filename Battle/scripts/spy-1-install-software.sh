#!/bin/bash
echo "Spy 1: Update/Install software"
echo "  Note: we use shortcut 'ssh spy' for 'ssh debian@10.72.23.167 -i  ~/.ssh/id_rsa_10.77.23.86-secweb-3"

ssh spy "sudo apt-get update"
ssh spy "sudo apt-get install tree npm"

# try
ssh spy "uname -a"
ssh spy "ip  -br -4 addr"
ssh spy "id"
ssh spy "tree ~"