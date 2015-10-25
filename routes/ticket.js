var ticket	= require('../config/models/ticket');

module.exports = function(app, ensureAuth, ensureAdmin) {

	app.get('/home', ensureAuth, function(req, res) {
		ticket.find({ticket_id: req.user._id}, function(err, ticket_data){
				res.render('home', {ticket: ticket_data});
			});
	});

	app.post('/home', ensureAuth, function(req, res) {
		var newTicket =	new ticket;

		newTicket.ticket_id = req.user._id;
		newTicket.subject 	= req.body.subject;
		newTicket.name		= req.body.name;
		newTicket.content 	= req.body.content;
		newTicket.category	= req.body.category;

		newTicket.save(function(err) {
			if (err) res.send({success: false});
			console.log("Ticket registered");
			res.send({success: true});
		});
	});

	app.get('/home/ticket/:ticketId', ensureAuth, function(req, res) {
		ticket.findOne({ _id: req.params.ticketId }, function(err, data){
			if (req.user._id == data.ticket_id) {
				res.render('ticket', { ticketData: data });
			}
			else
				res.send(404, "ERROR SOMEWHERE!");
		});
	});

};