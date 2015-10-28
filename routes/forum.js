
var Category = require('../config/models/forum_ctg');
var	Topic 	 = require('../config/models/topic');

module.exports = function(app, ensureAuth, ensureAdmin) {

	app.get('/forum', ensureAuth, function(req, res) {
		Category.find(function(err, ctg_data){
			Topic.find(function(err, topic_data){ 
				res.render('forum', {categoryData: ctg_data, user: req.user, topicData: topic_data});
			});
		});
	});

	app.post('/forum/addctg', ensureAdmin, function(req, res) {
		Category.findOne({name: req.body.newCtg}, function(err, data){
			if (!data) {
				var newCtg = new Category;
				newCtg.name = req.body.newCtg;

				newCtg.save(function(err){
					if (err) throw err;
					console.log("Category Added !");
					res.send({success: true});
				})
			}
			else {
				console.log("Category already exist !");
				res.send({success: false})
			}
		});
	});

	app.post('/forum/rmctg', ensureAdmin, function(req, res) {
		Category.remove({name: req.body.name}, function(err){
			if (err) throw err;
			console.log("Category removed !");
			res.send({success: true});
		});
	});

	app.post('/forum/editctg', ensureAdmin, function(req, res) {
		Category.update({name: req.body.oldCtg}, {$set: { name: req.body.ctg}}, function(err){
			if (err) throw err;
			console.log("Category changed !");
			res.send({success: true});
		});
	});

	app.post('/forum/thread', function(req, res) {
		var newTopic = new Topic

		newTopic.topicTitle		= req.body.title, 
		newTopic.topicCategory	= req.body.category, 
		newTopic.topicContent	= req.body.content,
		newTopic.topicAuthor	= req.user.user_info.username

		newTopic.save(function(err){
			if (err) throw err;
			console.log("Topic Created !");
			res.send({success: true});
		});
	});

	app.get('/forum/thread/:topicId', ensureAuth, function(req, res) {
		Topic.findOne({_id: req.params.topicId}, function(err, data) {
			res.render('thread', {topic: data, topicReply: data.topicReply});
		});
	});

	app.post('/forum/thread/topic', ensureAuth, function(req, res) {
		Topic.update({_id: req.body.replyId}, 
			{$push: {topicReply: {
				topicRep_user: req.user.user_info.username,
				topicRep_message: req.body.contentText,
			}}}, function(err, result){
				if (err) res.send({success: false});
				console.log("Reply Send!");
				res.send({success: true});	
			});
	});

	app.post('/home/thread/replySub', ensureAuth, function(req, res) {
		var i = req.body.count;
		if (req.body.rep[i]) {
			Topic.update({'topicReply._id' : req.body.data}, 
					{$push : { 'topicReply.topicRep_sub': {
							repSub_user: req.user.user_info.username,
							repSub_content: req.body.rep[i], 
						}
					}
				},	
				function(err, result){
					if (err) throw err;
					console.log(result);
					console.log("Sub Reply Send !");
					res.send({success: true});
				});
		}
	});
};