//Get Profile page
exports.profile = function(req, res){
    let user = req.session.user;
    if(user) {
        res.render('profile', {opp:req.session.opp, name:user.fullname});
        return;
    }
    res.redirect('/');
    //res.render('profile',  { name:user.fullname});
    //res.send('this is the profile');
};


/*exports.profile_edit= function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM users WHERE id = ?',[id],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
                var userData = {   /*var storing data from two diff tables
                    username: rows[0].username,
                    fullname: rows[0].fullname,
                    email: rows[0].email,
                    phone: rows[0].phone,
                };

            res.render('profile',{page_title:"Profile",userData:rows});
        });
        //console.log(query.sql);
    }); 
};*/
