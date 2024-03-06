#!/bin/bash
curl -XPOST 127.0.0.1:3000/upload -H "Content-Type: text/plain" --data-ascii "whateveryoulike"