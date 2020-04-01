/*
 * GET about us page.
 */

exports.about = function(req, res){
	res.render('about_us', {title: "About Us" });
};

