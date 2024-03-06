#!/bin/bash
echo "Evil 1: Update/Install software"
echo "  Note: we use shortcut 'ssh evil' for 'ssh debian@10.72.23.147 -i  ~/.ssh/id_rsa_10.77.23.86-secweb-3"

ssh evil "sudo apt-get update"
ssh evil "sudo apt-get install tree npm"

# try
ssh evil "uname -a"
ssh evil "ip  -br -4 addr"
ssh evil "id"
ssh evil "tree ~"