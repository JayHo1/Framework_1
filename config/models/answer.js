var mongoose = require('mongoose');

module.exports = function(connect3) {

	var answerSchema = mongoose.Schema ({

		rep_id 	: { type: String, required: true },

		rep 	: [{
			rep_user	: { type: String }, 
			rep_message	: { type: String },
			rep_date	: { type: Date, default: Date.now}
		}]
	});

	module.exports = connect3.model('answerTicket', answerSchema);
};