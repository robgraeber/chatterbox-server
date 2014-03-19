var storage = require("./storage.js");

exports.handler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;
  var payload = '';
  var headers = {};
  headers['Content-Type'] = "text/json";

   if(request.url.indexOf('/classes') === -1) {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end("404 NOT FOUND!!!!"); 
    return;
  }

  if(request.method === 'POST'){
    statusCode = 201;
    request.on('data', function (data) {
      payload += data;
    });

    request.on('end', function () {
      var data = JSON.parse(payload);
      console.log("storage added", data);

      storage.add(data);
    });   
  }

  response.writeHead(statusCode, headers);

  response.end(JSON.stringify({results: storage.get()}));   
 };
