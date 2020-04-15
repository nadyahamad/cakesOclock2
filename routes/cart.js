/*
 * GET cart page.
 */
var imageMappings = require('../mappings/images');

exports.cart = function(req, res){
	res.render('cart', {title: "Your Order" });
};
