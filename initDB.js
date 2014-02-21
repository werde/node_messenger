var User = require('./models/user').User;

var user = new User({
	name : "kokoko", 
	salt : "342",
	hashedPwd : "242",
	key : "fdds"
})
user.save(function(err, user, affected){
	console.log("arguments" + arguments);
	console.log("ere" + err);
	User.findOne({name : "kokoko"}, function(err, trt){
		console.log("kokoko" + trt);
	})
});
console.log("arguments" + arguments);