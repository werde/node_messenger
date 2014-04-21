exports.post = function(req, res, next) {
	req.session.destroy(function(err){
		if (err) throw err;

		res.redirect("/");
	})
}