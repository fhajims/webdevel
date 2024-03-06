#!/usr/bin/env node
var messages = require('./gen/cracking_pb');
var services = require('./gen/cracking_grpc_pb');

var grpc = require('@grpc/grpc-js');

/**
 * Implements the Cracking RPC method.
 */
function crackTheMD5Hash(call, callback) {
  console.log("We try to crack the MD5 hash ", call.request.getMd5hash())
  //  md5 -s verySecure
  // MD5 ("verySecure") = 3acab568ca3c13728919f1c711e22afd
  var reply = new messages.PasswordReply();
  reply.setPassword('verySecure');
  callback(null, reply);
}

function main() {
  var server = new grpc.Server();
  server.addService(services.MD5HashCrackingService, {
      crackTheMD5Hash: crackTheMD5Hash
      // other methods
  });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
