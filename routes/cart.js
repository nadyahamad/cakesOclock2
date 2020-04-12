/*
 * GET cart listing.
 */

exports.cartlist = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM products',function(err,rows)
          {
              if(err)
                  console.log("Error Selecting : %s ",err );
              res.render('products',{page_title:"Products - Node.js", datax:rows});
           });
           //console.log(query.sql);
      });
  };