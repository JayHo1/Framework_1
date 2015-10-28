var mongoose = require('mongoose');

module.exports = function(connect6) {

	var replyTopicSchema = mongoose.Schema({

		topicRep_Id			: {type : String, required: true},
		topicRep_sub		: [{
			repSub_user		: {type : String}, 
			repSub_content	: {type: String},
			repSub_date		: {type : Date, default: Date.now}
		}],
	});

	module.exports = connect6.model('replyTopic', replyTopicSchema);
};