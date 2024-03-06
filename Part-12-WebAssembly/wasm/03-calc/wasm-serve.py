#!/usr/bin/env python3
import sys
import http.server
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver

# optionally, startup server with './wasm-serve.py <port>'
PORT= int(sys.argv[1])  if len(sys.argv) > 1 else 8000
 
# Minor modifications to return the proper Mime-type for wasm files:
Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map['.wasm'] = 'application/wasm'


# startup
httpd = socketserver.TCPServer(  ('0.0.0.0', PORT),  Handler )
print("Modified Python3 server for WASM (application/wasm) is serving at port", PORT)
httpd.serve_forever()