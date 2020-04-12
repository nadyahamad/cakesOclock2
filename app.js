/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var methodOverride = require('method-override')
//load customers route
var customers = require('./routes/customers');
//load products route
var products = require('./routes/products');
//load about route
var aboutjsfile = require('./routes/about');
//load contact route
var contactjsfile = require('./routes/contact');
//load faq route
var faqjsfile = require('./routes/faq');
//load cpolicy route
var cpolicyjsfile = require('./routes/cpolicy');
//load checkout route
var checkoutjsfile  = require('./routes/checkout');
//load location route
var locationjsfile  = require('./routes/location');

//load register route
var registerjsfile = require('./routes/register');



var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/

app.use(

    connection(mysql,{

        host:"cakesdb1.cvnkqaqbljxc.us-east-1.rds.amazonaws.com",
        user: 'admin',
        password : 'Ireland1',
        port : 3306,
        database : "cakesOclockSch", //schemaName

    },'pool')

);



app.get('/', routes.index);
//get register url
app.get('/register', registerjsfile.register);

//get login url
app.get('/login', registerjsfile.login);

//get about_us url
app.get('/about_us', aboutjsfile.about);
//get contact_us url
app.get('/contact_us', contactjsfile.contact);
//get faq url
app.get('/faq', faqjsfile.faq);
//get cookie policy url
app.get('/cookie_policy', cpolicyjsfile.cpolicy);

app.get('/customers', customers.list);
app.get('/products', products.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);

//get checkout url
app.get('/checkout', checkoutjsfile.checkout);
app.get('/location', locationjsfile.location);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});