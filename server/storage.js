_ = require('underscore');

var messages = [];

exports.get = function(options) {
	// Returns and array of objects stored in messages
	// These are sorted as if by magic
	return messages;
};

exports.add = function(item) {
	// Creates an object with all of the attributes that are needed
	// For Sorting to happen later
	// Ex. Attaches a created at date
	var rightNow = function() {
		return (new Date()).toJSON();
	}
	var obj = _(item).extend({created_at: rightNow()});
	messages.push(obj);
}