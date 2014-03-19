/* Import node's http module: */
var express = require("express");
var _ = require("underscore");
var handleRequest = require("./request-handler.js").handler;

var port = 3000;
var app = express();
app.htmlroot = '../public/';

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

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

app.get('/classes/chatterbox', function(req, res){
  handleRequest(req, res);
});

app.post('/classes/chatterbox', function(req, res){
  handleRequest(req, res);
});