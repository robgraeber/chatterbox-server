var app = {};

app.server = 'http://localhost:3000/classes/chatterbox?order=-createdAt';
app.messageStack = { storage: {}, messages: [] };
app.messages = { storage: {}, messages: [] };

app.chatrooms = { 'default': [] };
app.chatrooms.current = 'default';

// Message Model
app.message = {
  username: '',
  text: '',
  roomname: ''
};

// var Message = Backbone.model.extend({
// 	initialize: function(username, text, roomname){
// 	},
// 	defaults: {
// 		username: app.username,
// 		text: '',
// 		roomname: 'Main'
// 	}
// });