//state routes

module.exports = function(app){
	app.get("/", require('./frontpage.js').get);

	app.get("/user", require('./user.js').get);

	app.get("/login", require('./login.js').get);

	app.post("/login", require('./login.js').post);

	app.post("/logout", require('./logout.js').post);

	app.get("/chat", require('./chat.js').get);
};

