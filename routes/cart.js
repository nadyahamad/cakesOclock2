/*
 * GET cart page.
 */
const Cart = require('../mappings/cart');
const imageMappings = require('../mappings/images');
const Item = require ('../routes/items')

/*exports.cart = function(req, res){
	res.render('cart', {title: "Your Order" });
};*/

exports.getCart = (req, res, next) => {
    res.render('cart', { cart: Cart.getCart(), pageTitle: 'Your Order', path: '/cart', name: '' })
}

exports.addToCart = (req, res, next) => {
    const addedProduct = Product.findById(req.body.id)[0];
    Cart.save(addedProduct);
    res.redirect('/cart');
}

exports.deleteInCart = (req, res, next) => {
    Cart.delete(req.body.prodId);
    res.redirect('/cart');
}
