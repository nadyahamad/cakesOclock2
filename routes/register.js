const express = require('express');
//const User = require('./routes/user');
const router = express.Router();


// Get register page.
exports.register = function(req, res){
	res.render('register', {title: "Create an account" });
};

//  Get login page 
exports.login = function(req, res){
	res.render('login', {title: "Log in" });
};

/*Save users*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
			first_name: input.first_name,
        	last_name: input.last_name,
        	email: input.email,
        	phone: input.phone,
        	password: input.password
        
        };
        
        var query = connection.query("INSERT INTO users set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};



//module.exports = router;