/*
 * GET shops listing.
 */


exports.location = function(req, res){


  req.getConnection(function(err,connection){

        var query = connection.query('SELECT id, shop_location FROM shops',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

                shop_list ={}

              rows.forEach (record => {
                  shop_list[record.id]  =   record.shop_location
                })
                 res.json(shop_list);
              });


         });

         //console.log(query.sql);
    };


