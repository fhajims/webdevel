#!/usr/bin/env python3
import sys
import http.server
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver
PORT= int(sys.argv[1])  if len(sys.argv) > 1 else 8000
 
Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map['.wasm'] = 'application/wasm'
httpd = socketserver.TCPServer(  ('localhost', PORT),  Handler )

print("Modified Python3 server for WASM (application/wasm) is serving at port", PORT)
httpd.serve_forever()