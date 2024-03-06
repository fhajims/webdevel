import http from 'http'

console.log("Webfrontend Node.js is starting ...")
// const frontend = require('./app/main.js')
import {startup} from './app/main'
const serverConfig =  {"server_port": 5000, staticdir:   "public" }
startup(serverConfig)
