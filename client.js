const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');

const packageDefinition = protoLoader.loadSync(
    "greetings.proto",
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const greetings_proto = grpc.loadPackageDefinition(packageDefinition).greetings;

// function main() {
//     const client = new greetings_proto.Greeter('localhost:50051',
//                                        grpc.credentials.createInsecure());

//     client.SayHello({name: 'World'}, function(err, response) {
//         console.log('Greeting:', response.message);
//     });
// }

// main();


function getFile() {
    const client = new greetings_proto.Greeter('localhost:50051',
                                       grpc.credentials.createInsecure());
    const call = client.TransferFile({filename: 'oranges.jpg'});
    const fileWriter = fs.createWriteStream('oranges_received.jpg'); 

    call.on('data', function(fileChunk) {
        fileWriter.write(fileChunk.content);
    });

    call.on('end', function() {
        fileWriter.end();
        console.log('File Transfer Completed');
    });

    call.on('error', function(e) {
        console.log('Error:', e);
    });
}

getFile();