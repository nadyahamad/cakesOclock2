//Get Profile page
exports.profile = function(req, res){
    let user = req.session.user;
    if(user) {
        res.render('profile', {opp:req.session.opp, name:user.fullname, data:user.id});
        return;
    }
    res.redirect('/');
    //res.render('profile',  { name:user.fullname});
    //res.send('this is the profile');
};

/* Connect Users database
exports.list = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM users',function(err,rows)
          { 
              if(err)
                  console.log("Error Selecting : %s ",err );
              res.render('profile',{page_title:"users - Node.js",data:rows});
           });
           //console.log(query.sql);
    });
};*/


exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM users WHERE id = ?',[id],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('profile',{page_title:"Edit User - Node.js",data:rows});
        });
        //console.log(query.sql);
    }); 
};
