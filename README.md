# micro.analyze

CURRENT BUG:
```
var n = require('natural')
```

This throws the following error:
```
{
  "errorMessage": "/var/task/node_modules/webworker-threads/build/Release/WebWorkerThreads.node: invalid ELF header",
  "errorType": "Error",
  "stackTrace": [
    "Module.load (module.js:487:32)",
    "tryModuleLoad (module.js:446:12)",
    "Function.Module._load (module.js:438:3)",
    "Module.require (module.js:497:17)",
    "require (internal/module.js:20:19)",
    "bindings (/var/task/node_modules/bindings/bindings.js:76:44)",
    "Object.<anonymous> (/var/task/node_modules/webworker-threads/index.js:1:105)",
    "Module._compile (module.js:570:32)"
  ]
}
```

Need to examine how AWS Lambda linux AMI's use webworker threads.  May need to abstract out the 'natural' functions with raw algos.  
