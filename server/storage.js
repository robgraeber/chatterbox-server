var _ = require('underscore');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var messageSchema = mongoose.Schema({
	username: String,
	created_at: Date,
	text: String,
	roomname: String,
	objectId: String,
});

var Message = mongoose.model('Message', messageSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	
	Message.find(function (err, msgs) {
		_(msgs).each(function(msg) {
			messages.push(msg)
		})
  });
});

var messages = [];

exports.get = function(options) {
	// Returns and array of objects stored in messages
	// These are sorted as if by magic
	return _(messages).map(function(message){ return message; });
};

exports.add = function(item) {
	// Creates an object with all of the attributes that are needed
	// For Sorting to happen later
	// Ex. Attaches a created at date
	var rightNow = function() {
		return (new Date()).toJSON();
	}
	var obj = _(item).extend({created_at: rightNow()});
	// messages.push(obj);
	var newMessage = new Message(obj);
	newMessage.save();
	messages.push(newMessage);
}