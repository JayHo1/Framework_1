//** Forum Category Data
var mongoose = require('mongoose');

module.exports = function(connect4) {

	var categorySchema = mongoose.Schema ({

		name 			: { type: String, required: true},
		sub_category	: [{ type: String }]
	
	});
	module.exports = connect4.model('ctg', categorySchema);
}