#!/bin/bash
echo "Spy 5: Send request with demo data to Spy Server"


curl 'http://spy:9000/look/we/got?a=very&secure#pwd' --cookie "api-key=c54f32b21; lang=en" --data "user=admin&pwd=verysecure"
