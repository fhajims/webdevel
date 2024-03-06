#!/bin/zsh

echo "We remove all the node_modules folders"
find . -type dir -name "node_modules" -exec rm -rf {} +

echo "Done"