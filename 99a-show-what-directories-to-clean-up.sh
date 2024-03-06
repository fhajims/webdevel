#!/bin/zsh

echo "we show the sizes of all the node_modules folders"
find . -type dir -name "node_modules" -exec du -ms {} +

echo "Done"