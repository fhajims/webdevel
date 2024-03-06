#!/bin/bash

# Installation of the compiler:
# https://emscripten.org/docs/getting_started/downloads.html 
# sudo git clone https://github.com/emscripten-core/emsdk.git /usr/local/emsdk
# sudo /usr/local/emsdk/emsdk install latest 
# sudo /usr/local/emsdk/emsdk activate latest
# source /usr/local/emsdk/emsdk_env.sh 
# echo "source /usr/local/emsdk/emsdk_env.sh" >>  ~/.zshrc

# possibly, you need to set permissions for current user
# sudo chmod  -R u+rwx /usr/local/emsdk/upstream/emscripten/cache/ 
# sudo chmod g+rwx /usr/local/emsdk/upstream/emscripten/cache.lock

# emcc --version
 
emcc   -s EXPORTED_FUNCTIONS='["_add","_sub","_main"]'   -Os   -s SIDE_MODULE=1   hello.c 
