app.init = function(parameters) {
  app.chatrooms.add({roomname: 'default'});
  app.username = QueryString.username;
  this.fetch();
  setInterval(app.fetch, 3000);
};

// // returns the message object
// app.createMessage = function(){
//   var msg = Object.create(app.message);
//   msg.username = app.username;
//   msg.text = $('.message').val();
//   msg.roomname = 'Default';
//   $('.message').val('');
//   return msg;
// };

// start
$(document).ready(function() {
  $('.username').keyup(function(event){
    if (event.which === 13){
      app.username = $('.username').val();
      $('.username').val('');
    }
  });

  $('.message').keyup(function(event){
    if (event.which === 13){
      message = app.createMessage();
      app.send( message );
    }
  });

  $('.send').click(function(){
    message = app.createMessage();
    app.send( message );
  });

  $('.main').click(function(){
    app.chatrooms.current = 'default';
  });

  app.init();
});