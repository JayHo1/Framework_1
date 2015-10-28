var mongoose 	= require('mongoose');

module.exports = function(connect2) {

	var ticketSchema = mongoose.Schema ({

		ticket_id 	: { type: String, required: true },
		subject		: { type: String, required: true },
		name		: { type: String, required: true },
		content		: { type: String, required: true },
		assignTo	: { type: String, default: "" },
		category	: { type: String },
		status		: { type: String, default: "Being solved"},
		date_create : { type: Date, default: Date.now}
	});

	module.exports = connect2.model('ticket', ticketSchema);
};