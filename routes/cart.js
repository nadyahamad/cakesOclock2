/*
 * GET cart page.
 */
exports.cart = function(req, res){

    req.getConnection(function(err,connection) {

        connection.query('SELECT id, shop_location FROM shops',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('cart', {title: "Your Order", locations: rows });
        });

    });
};

exports.cart_items = function(req, res) {
    var rawProductSizeIds = req.body;
    if (!rawProductSizeIds || !(rawProductSizeIds instanceof Array)) {
        res.status(400).json({ error: 'Item IDs should be an Array' });
        return;
    }
    if (rawProductSizeIds.length === 0) {
        res.status(200).json([]);
        return;
    }

    req.getConnection(function(err, connection) {
        if (err) {
            console.log("Error Getting Connection : %s ", err);
            res.status(500).json({ error: 'Error Getting Connection' });
        }

        var numericIds = [], numericId;
        for (var i = 0, len = rawProductSizeIds.length; i < len; i++) {
            numericId = Number(rawProductSizeIds[i]);
            if (numericId > 0) {
                numericIds.push(numericId);
            }
        }

        var queryStr = 'SELECT p.*, s.name size_name, ps.id ps_id, ps.price price FROM products p INNER JOIN product_size ps ON p.id = ps.product_id INNER JOIN sizes s ON s.id = ps.size_id WHERE ps.id IN (?)';
        connection.query(queryStr, [numericIds], function(err,rows) {
            if (err) {
                console.log("Error Executing Query : %s ", err);
                res.status(500).json({ error: 'Error Executing Query' });
            }

            res.status(200).json(rows);
        });

    });
};
