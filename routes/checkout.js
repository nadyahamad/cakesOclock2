/*
 * GET checkout page.
 */

exports.checkout = function(req, res){
	res.render('checkout', {title: "Checkout" });
};

