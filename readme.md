WebDevAppl - Cakes Oclock eCommerce

## Configuration
Platform: node v13.9.0,
Framework: express,
Database: mysql squelize,
Testing: ,
Deployment: heroku,
AWS: ECR, ECS, EC2, RDS and ElasticCAche,
app.js

        host: 'localhost',
        user: 'root',
        password : ******,
        port : 4300, 
        database:'nodejs'

## APIs are divided in three types

Users -

get.register: create a user
get.fetch.id: get user data by user id
post.login: login for user
post.login_data:
post.logout: logout for user
get.profile:
get.users:
//post.permission: admin can add various roles to user
//post.role: admin can add new roles to system e.g. customer, admin or seller


Products -

//post.category: admin can create a product category like kitchen
//post.add: seller can add product
get.fetch.id: get product details by product id
//put.update.id: seller can update product details by product id
//delete.item.id: seller can remove product details by product id
//put.readd.id: seller can re add a deleted product by product id
get.products:list all products
get.items.id: get item data by product id

Orders -

post.create: create a defult order.
get.order.id: get order details by order id
put.order.id: update order details by order id
post.addToCart: add any item into a cart.
get.activeCart.id: get details of users cart by user id
get.cart.id: get details of any cart by cart id
delete.removeFromCart: delete items from cart
post.ship: create shipment of order
get.ship.id: get shipment details by shipment id
put.ship.id: update shipment details by shipment id
post.warehouse.id: admin can create a warehouse whihc will be attached to product and seller
	
	
You're gonna need to create a DB named 'cakesOclockSch' and import customer.sql

