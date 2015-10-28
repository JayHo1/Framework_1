
var mongoose = require('mongoose');

module.exports = function(connect5) {

	var topicSchema = mongoose.Schema({

		topicTitle		: {type: String, required: true},
		topicCategory	: {type: String, required: true},
		topicContent	: {type: String, required: true},
		topicAuthor		: {type: String, required: true},
		topicStatus		: {type: String, default: "open"},
		topicDate		: {type: Date, default: Date.now},

		topicReply				: [{
			topicRep_user		: {type : String},
			topicRep_message 	: {type : String},
			topicRep_sub		: [{ 	repSub_user: {type : String}, 
										repSub_content: {type: String}
																		}],
			topicRep_date		: {type : Date, default: Date.now}
		}]
	});

	module.exports = connect5.model('topic', topicSchema);
};