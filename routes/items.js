/*
 * GET item selected description.
 */

exports.items = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var queryStr = 'SELECT p.*, s.name size_name, ps.id ps_id, ps.price price FROM products p INNER JOIN product_size ps ON p.id = ps.product_id INNER JOIN sizes s ON s.id = ps.size_id WHERE p.id = ?'
        var query = connection.query(queryStr, [id], function(err,rows)  /*(query, data, callback)*/
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            var productWithSizes = {   /*var storing data from two diff tables*/ 
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
            }

            res.render('items',{page_title:"Item", item: productWithSizes });
        });

    });
};


/*exports.add = function(req, res){
  res.render('add_products',{page_title:"Add Product Item - Node.js"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM products WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_products',{page_title:"Edit Product Item - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the customer
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};
exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};
exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};
*/

