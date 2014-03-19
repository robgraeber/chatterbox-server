// returns the message object
app.createMessage = function(options){
  var msg = Object.create(app.message);

  msg.username = app.username;
  msg.text = $('.message').val();
  msg.roomname = app.chatrooms.current;

  console.log(msg.roomname);
  $('.message').val('');

  return msg;
};

app.messageStack.add = function(msg){
  key = msg.created_at;

  if (this.storage[key] === undefined){
    app.chatrooms.add(msg);
    this.messages.push(msg);
    this.storage[key] = true;
  }
};

app.send = function(messageObject) {
  if(messageObject.text === '') {
    throw "No Message Error";
  }

  $.ajax({
    url: 'http://localhost:3000/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(messageObject),
    contentType: 'application/json',
    success: function (data) {
      app.fetch();
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: '',
    contentType: 'application/json',
    success: function (data) {
      // data = JSON.parse(data);
      console.log(data);
      data = data.results;
      // TODO REFACTOR TO USE FIND
      _(data).each(function(msg){
        // Refactor this to return false if add fails
        app.messageStack.add(msg);
      });
      console.log(app.messageStack);
      if(app.chatrooms.current === 'default'){
	      app.displayMessages(app.messageStack.messages);
      } else {
      	app.displayMessages(app.chatrooms[app.chatrooms.current]);
      }
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};