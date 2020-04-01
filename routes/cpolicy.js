/*
 * GET faq page.
 */

exports.cpolicy = function(req, res){
	res.render('cookie_policy', {title: "Cookies Policy page" });
};