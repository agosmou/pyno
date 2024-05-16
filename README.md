generate code:

```
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. greetings.proto
```


```
npm install -g grpc-tools
npm install @grpc/grpc-js
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:. --grpc_out=. --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` greetings.proto
```



run in separate terminals:

```
python server.py
```
```
node client.js
```