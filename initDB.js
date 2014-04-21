var async = require('async');
var mongoose = require("./lib/mongoose")

async.series([
	open,
	dropDatabase,
	requireModels,
	createUsers
], function(err){
	if(err) throw(err);
	console.log("kokokokoko kokoko koko ko"+ (0 ? 99 : 98));
	mongoose.disconnect();
	process.exit(1 ? 99 : 98);
});

function open(callback) {
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback) {
	require('./models/user');

	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createUsers(callback) {
	var users = [ {name : "vas", pwd : "asdasd"}, {name : "zxc", pwd : "vcxz"} ];

	async.each(users, function(userData, callback){
		var user = new mongoose.models.User(userData);
		user.save(callback);
		console.log(user);
	}, callback);
}
