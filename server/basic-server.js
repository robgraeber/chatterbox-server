/* Import node's http module: */
var express = require("express");
var app = express();
var _ = require("underscore");
var handleRequest = require("./request-handler.js").handler;

app.htmlroot = '../public/';

/* Every server needs to listen on a port with a unique number. The
 * standard port for HTTP servers is port 80, but that port is
 * normally already claimed by another server and/or not accessible
 * so we'll use a higher port number that is not likely to be taken: */
var port = 3000;

/* For now, since you're running this server on your local machine,
 * we'll have it listen on the IP address 127.0.0.1, which is a
 * special address that always refers to localhost. */
var ip = "100.71.76.102";
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
app.configure(function(){
  // app.use('/', express.static('../public')); // This is the same as line 27
  app.use('/', express.static(__dirname + '/../public'));
  app.use('/scripts', express.static(__dirname + '/../public/scripts'));
  app.use('/bower', express.static(__dirname + '/../public/bower_components'));

  app.use(function(req, res, next) {
  	_(defaultCorsHeaders).each(function(item, k){
  		res.setHeader(k, item);
  	});
    return next();
  });
  // app.use(express.static(path.join(application_root, "StaticPages")));
  // app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/* We use node's http module to create a server. Note, we called it 'server', but
we could have called it anything (myServer, blahblah, etc.). The function we pass it (handleRequest)
will, unsurprisingly, handle all incoming requests. (ps: 'handleRequest' is in the 'request-handler' file).
Lastly, we tell the server we made to listen on the given port and IP. */
// var server = http.createServer(handleRequest);
// console.log("Listening on http://" + ip + ":" + port);
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

// app.get('/', function(req, res){
// 	//return index.html
// 	res.sendfile(app.htmlroot + 'index.html');
// })


app.get('/classes/chatterbox', function(req, res){
  handleRequest(req, res);
});

app.post('/classes/chatterbox', function(req, res){
  handleRequest(req, res);
});

/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:3000 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */
