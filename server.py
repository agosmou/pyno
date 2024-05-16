from concurrent import futures
import os
import grpc
import greetings_pb2
import greetings_pb2_grpc

class Greeter(greetings_pb2_grpc.GreeterServicer):

    def SayHello(self, request, context):
        return greetings_pb2.HelloReply(message='Hello, %s!' % request.name)
    
    def TransferFile(self, request, context):
        # you might have to play with the directory path below
        filename = os.path.join('/images',request.filename)
        with open(filename, 'rb') as f:
            while True:
                chunk = f.read(1024)
                print('file chunk sent')
                if len(chunk) == 0:
                    print('File Transfer Complete')
                    break
                yield greetings_pb2.FileChunk(content=chunk)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    greetings_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print('Starting Server on Port:50051')
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
