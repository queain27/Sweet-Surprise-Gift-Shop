var express = require('express');
const Cart = require('../models/cart');
var cart = express.Router();

//get gift model
var Product = require('../models/gift');
var ProductM = require('../models/giftM');
var ProductP = require('../models/giftP');
var ProductR = require('../models/giftR');
 
/*
 * GET add product to cart
 */
cart.get('cart/add/:product', function (req, res) {

  var slug = req.params.product;

  Product.findOne({slug: slug}, function (err, p) {
      if (err)
          console.log(err);

      if (typeof req.session.cart == "undefined") {
          req.session.cart = [];
          req.session.cart.push({
              nameGift: slug,
              qty: 1,
              price: parseFloat(p.priceGift).toFixed(2),
          });
      } else {
          var cart = req.session.cart;
          var newItem = true;

          for (var i = 0; i < cart.length; i++) {
              if (cart[i].nameGift == slug) {
                  cart[i].qty++;
                  newItem = false;
                  break;
              }
          }

          if (newItem) {
              cart.push({
                  nameGift: slug,
                  qty: 1,
                  price: parseFloat(p.priceGift).toFixed(2),
              });
          }
      }

//        console.log(req.session.cart);
      req.flash('success', 'Product added!');
      res.redirect('/standard');
  });

});

/*
* GET checkout page
*/
cart.get('/checkout', function (req, res) {

  if (req.session.cart && req.session.cart.length == 0) {
      delete req.session.cart;
      res.redirect('/cart/checkout');
  } else {
      res.render('./user/checkout.ejs', {
          title: 'Checkout',
          cart: req.session.cart
      });
  }

});

/*
* GET update product
*/
cart.get('/update/:product', function (req, res) {

  var slug = req.params.product;
  var cart = req.session.cart;
  var action = req.query.action;

  for (var i = 0; i < cart.length; i++) {
      if (cart[i].title == slug) {
          switch (action) {
              case "add":
                  cart[i].qty++;
                  break;
              case "remove":
                  cart[i].qty--;
                  if (cart[i].qty < 1)
                      cart.splice(i, 1);
                  break;
              case "clear":
                  cart.splice(i, 1);
                  if (cart.length == 0)
                      delete req.session.cart;
                  break;
              default:
                  console.log('update problem');
                  break;
          }
          break;
      }
  }

  req.flash('success', 'Cart updated!');
  res.redirect('/cart/checkout');

});

/*
* GET clear cart
*/
cart.get('/clear', function (req, res) {

  delete req.session.cart;
  
  req.flash('success', 'Cart cleared!');
  res.redirect('/cart/checkout');

});

module.exports=cart;
