/*
 * GET user/profile page.
 */

exports.user = function(req, res){
	res.render('user', {title: "User Profile Page" });
};

