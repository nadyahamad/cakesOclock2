/*
 * GET shops listing.
 */

exports.location = function(request, response){
    
    console.log('get method locations');
       
    let query = "SELECT id,shop_location FROM shops";
               
   shop_list ={location}
   db.query(select_query , (error, result)=>{
    if (error) {

       response.sendStatus(500).send(error);
    }
       
    result.forEach (record => {
      shop_list[shop.id]  =   shop.location
    })
     response.json(shop_list);
  });

};



