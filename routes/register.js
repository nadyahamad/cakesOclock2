/*
 * GET register page.
 */

exports.register = function(req, res){
	res.render('register', {title: "Create an account" });
};

/*  GET login page */

exports.login = function(req, res){
	res.render('login', {title: "Log in" });
};


