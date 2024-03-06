#!/bin/bash
echo "We startup a server to allow you view files at http://localhost:7777/"
echo "Stop with 'killall Python'"
./wasm-serve.py 7777
