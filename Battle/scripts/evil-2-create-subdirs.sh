#!/bin/bash
echo "Spy 2: Create subdir 'provide-malicious-code'"

#ssh evil "mkdir -p evil-server-for-team-C-port-7003/provide-malicious-code"
ssh evil "mkdir -p evil-server-for-port-7000/provide-malicious-code"