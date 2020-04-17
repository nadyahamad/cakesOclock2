/*
 * GET user/profile page.
 */

exports.profile = function(req, res){
	res.render('profile', {title: "User Profile Page" });
};

