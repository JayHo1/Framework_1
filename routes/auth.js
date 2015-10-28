// Authentication

exports.ensureAdminAuthenticated = function(req, res, next) {
	if (req.isAuthenticated() && req.user.user_permissions.admin) {
		return next();
	} else {
		res.sendStatus(403);
	};
};

exports.ensureAuthenticated = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		res.sendStatus(403);
	};
};