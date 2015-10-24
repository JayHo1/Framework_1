var mongoose = require('mongoose')

module.exports = function(connect) {

	var userSchema = mongoose.Schema({
		
		user_info 			: {

			username		: {type: String, default: ''},
			password		: {type: String, default: ''},
			email			: {type: String, default: ''},
			lastname		: {type: String, default: ''},
			firstname		: {type: String, default: ''},
			date_create 	: {type: Date, default: Date.now},
		},
		user_permissions 	: {

			admin			: {type: Boolean, default: false},
			newbie			: {type: Boolean, default: true},
		}

	});

	module.exports = connect.model('User', userSchema);
}