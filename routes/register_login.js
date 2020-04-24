const express = require('express');
const User = require('../user_dbq/userdb');
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();

// Get register page.
exports.register = function(req, res){
    let user = req.session.user;
    //if there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/profile');
        return;
    }
    // IF not we just send the index page.*/
	res.render('register', {title: "Create an account" });
};

//  Get login page 
exports.login = function(req, res){
    let user = req.session.user;
    //if there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/profile');
        return;
    }
    // IF not we just send the index page.*/
	res.render('login', {title: "Log in" });
};


exports.profile = function(req, res){
    let user = req.session.user;
    if(user) {
        res.render('profile', {opp:req.session.opp, name:user.fullname});
        return;
    }
    res.redirect('/');
    //res.render('profile', {title: "Log in" });
    //res.send('this is the profile');
};



// Post login data 
exports.login_data = function(req, res, next){
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            //Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/profile');
            //res.send('Logged in as :' + result.username);
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
        }
    })
};

//  post register data 
exports.register_data = function(req, res, next){
    // prepare an object containing all user inputs.
    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/profile');
            });
            //res.send('Welcome' + userInput.username);
        }else {
            console.log('Error creating a new user ...');
        }
    });
};

