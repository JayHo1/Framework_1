
var Category = require('../config/models/forum_ctg');
var	Topic 	 = require('../config/models/topic');
var replySub = require('../config/models/replyTopic');

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

	app.post('/forum/thread', ensureAuth, function(req, res) {
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
			replySub.find(function(err, result) {
				res.render('thread', {topic: data, topicReply: data.topicReply, sub: result});
			});
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
			replySub.findOne({topicRep_Id: req.body.data}, function(err, data){
				if (!data) {

					var newSub = new replySub;

					newSub.topicRep_Id = req.body.data;
					newSub.topicRep_sub.push({repSub_user: req.user.user_info.username, repSub_content: req.body.rep[i]});
					newSub.save(function(err){
						if (err) throw err;
						console.log("Reply registed !")
						res.send({success: true});
					});
				}
				else {
					replySub.update({topicRep_Id: req.body.data}, 
						{$push: { topicRep_sub : {
							repSub_user: req.user.user_info.username,
							repSub_content: req.body.rep[i]}}},
					function(err){
						if (err) throw err;
						console.log("Reply Updated !");
						res.send({success: true});
					});
				}
			});
		}
	});

	app.post('/forum/remove/thread', ensureAdmin, function(req, res) {
		Topic.findOne({_id: req.body.threadId}, function(err, data){
			for(var i = 0; data.topicReply[i]; i++) {
				replySub.remove({topicRep_Id: data.topicReply[i]._id}, function(err){
					if (err) throw err;
				});
			};
			Topic.remove({_id: req.body.threadId}, function(err){
				if (err) throw err;
				console.log("Remove Success");
				res.send({success: true});
			});
		});
	});
};