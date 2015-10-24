// Hash Password
bcrypt			= require('bcrypt-nodejs');



	exports.generateHash = function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	};

	exports.validPassword = function(password, pass) {
		return bcrypt.compareSync(password, pass);
	};