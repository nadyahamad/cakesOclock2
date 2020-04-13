/*
 * GET cart page.
 */

exports.cart = function(req, res){
	res.render('cart', {title: "Your Order" });
};
