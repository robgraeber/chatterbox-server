/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var storage = require("./storage.js");
exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;
  var payload = '';
  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
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

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
