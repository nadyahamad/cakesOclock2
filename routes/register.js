/*
 * GET register page.
 */

exports.register = function(req, res){
	res.render('register', {title: "Create an account" });
};
