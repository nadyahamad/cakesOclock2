/*
 * GET cart page.
 */
//tatiana add code
exports.cart = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var queryStr = 'SELECT p.*, s.name size_name, ps.id ps_id, ps.price price FROM products p INNER JOIN product_size ps ON p.id = ps.product_id INNER JOIN sizes s ON s.id = ps.size_id WHERE p.id = ?'
        var query = connection.query(queryStr, [id], function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

       /*    var productWithSizes = {
                prd_img: rows[0].prd_img,
                name: rows[0].name,
                description: rows[0].description,
                allergen_info: rows[0].allergen_info,
                sizes: []
            };

            for (var i = 0; i < rows.length; i++) {
                productWithSizes.sizes.push({
                    id: rows[i].ps_id,
                    name: rows[i].size_name,
                    price: rows[i].price
                });
            }*/

            res.render('cart',{page_title:"Cart"/*, item: productWithSizes*/});
        });

    });
};
