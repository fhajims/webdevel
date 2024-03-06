#!/usr/bin/env node
console.log("We startup the MD5 Hash cracking gRPC client")
var messages = require('./gen/cracking_pb');
var services = require('./gen/cracking_grpc_pb');

var grpc = require('@grpc/grpc-js');

function main() {
  var serverWithPort = 'localhost:50051';
  var client = new services.MD5HashCrackingClient(
                serverWithPort,
                grpc.credentials.createInsecure());
  var request = new messages.HashRequest();

  //  md5 -s verySecure
  // MD5 ("verySecure") = 3acab568ca3c13728919f1c711e22afd
  
  request.setMd5hash('3acab568ca3c13728919f1c711e22afd');
  client.crackTheMD5Hash(request, function(err, response) {
    console.log('The password is:', response.getPassword());
  });
}

main();
