app.chatrooms.add = function(msg){
  if(this[msg.roomname] !== undefined){
    this[msg.roomname].push(msg);
  } else {
    //Seed storage
    this[msg.roomname] = [msg];
    // Added the rooms just below the header
    var $str = $('<button class="btn btn-warning"></button>');
    var saltedName = '123' + msg.roomname;

    $str.text(msg.roomname);
    $str.attr("class", "roombutton");
    console.log($str);
    $('#roomlist').append($str);
    // Click Handler for Chat Rooms
    $( '.roombutton' ).click(function(event) {
      console.log('Chatroom changed', $(this).text() );
      app.chatrooms.current = $( this ).text();
      app.displayMessages(app.chatrooms[app.chatrooms.current]);
    });
  }
};

app.displayMessages = function(chatroom){
  // messageList = messageList || app.messageStack.messages;
  // Takes an array of messages, and puts them onto the screen
  $( '.messages' ).empty();
  _(chatroom).each(function(msg){
    var $str = $('<li></li>');
    $str.text(msg.username + ": " + msg.text + " : " + msg.roomname);
    $('.messages').prepend($str);
  });
};