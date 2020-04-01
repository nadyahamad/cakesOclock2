/*
 * GET faq page.
 */

exports.faq = function(req, res){
	res.render('faq', {title: "FAQ page" });
};