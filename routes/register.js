const express = require('express');
const User = require('../core/user');
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();

// Get register page.
exports.register = function(req, res){
	res.render('register', {title: "Create an account" });
};

//  Get login page 
exports.login = function(req, res){
	res.render('login', {title: "Log in" });
};


exports.profile = function(req, res){
    let user = req.session.user;
    if(user) {
        res.render('profile', {title: "User Profile Page" });
        return;
    }
    es.redirect('/');
};



// Post login data 
exports.login_data = function(req, res, next){
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.email, req.body.password, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/profile');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('email/Password incorrect!');
        }
    })
};

//  post register data 
exports.register_data = function(req, res){
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
             //res.send('welcome' + userInput.first_name);
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
            req.session.user = result;
            req.session.opp = 0;
            res.redirect('/profile');
             });

        }else {
            console.log('Error creating a new user ...');
        }
    });
};


			
//  Get logout page 
exports.logout = function(req, res){
    res.render('/', {title: "Log out" });
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
};

//module.exports = router;