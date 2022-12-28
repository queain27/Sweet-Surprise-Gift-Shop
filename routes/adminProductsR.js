var express = require('express');
var adminProductsR = express.Router();

//get gift model
var ProductsR = require('../models/giftR');

var multer = require('multer');
const { path } = require('express/lib/application');
const res = require('express/lib/response');
const path4 = require('path');
const { mongo } = require('mongoose');
const { MongoStore } = require('connect-mongo');
const connectMongo = require('connect-mongo');
const { assert } = require('console');
const { render } = require('ejs');
const { fstat } = require('fs');

/*var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './views/user/img');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path2.extname(file.originalname));
  },
});

//var upload = multer({ storage: storage }).single('imageGift');

//route to menu list page that consists of edit and delete
/*adminProducts.get('/adminMenuList', (_req, res) => {
  return res.render('./admin/MenuList.ejs');
}) */

//route to add gift page

adminProductsR.get('/addGiftR', (req, res) => {
  return res.render('./admin/addGiftR.ejs');
});

//add gift without image yet
//adminProducts.post('/addGift', upload1, (req, res) => {
adminProductsR.post('/addGiftR', (req, res) => {
  console.log(req.body);
  var R;
  var newGiftR = {
    unique_id: R,
    nameGiftR: req.body.nameGiftR,
    //imageGift: req.file.filename,
    priceGiftR: req.body.priceGiftR,
    categoryGiftR: req.body.categoryGiftR,
  };

  ProductsR.create(newGiftR, (err, GiftR) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      console.log('Gift is added!');
      res.redirect('/menulistR');
    }
  });
});

adminProductsR.get('/menulistR', (req, res) => {
  console.log('menulistR');
  ProductsR.find({}, function (err, data) {
    console.log('MenuData');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./admin/MenuListR.ejs', { data: data });
    }
  });
});


//nk display dekat user page 
adminProductsR.get('/royal', (req, res) => {
  console.log('royal menu list ');
  ProductsR.find({}, function (err, data) {
    console.log('MenuData');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./user/Royal.ejs', { data: data });
    }
  });
});


//Get edit gift without image

adminProductsR.get('/editGiftR:id', function (req, res, next) {
  console.log(req.params.id);
  console.log('gifteu');

  ProductsR.findOne({ _id: req.params.id }, function (err, data) {
    console.log('gifteu editeu');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./admin/editGiftR.ejs', { data: data });
    }
  });
});

//post edit gift without image
// EDIT POST ACTION method 2

adminProductsR.post('/editGiftR:id', function (req, res, next) {
  
  var errors = req.validationErrors()
   
  if( !errors ) {   

      var gift = {
          nameGiftR: req.sanitize('nameGiftR').escape().trim(),
          priceGiftR: req.sanitize('priceGiftR').escape().trim(),
          categoryGiftR: req.sanitize('categoryGiftR').escape().trim(),
      }
      ProductsR.findByIdAndUpdate(req.body.id, 
          {nameGiftR:req.body.nameGiftR},{priceGiftR:req.body.priceGiftR},{categoryGiftR:req.body.categoryGiftR}, function(err, data) {
              if(err){
                      req.flash('error', 'Something Goes to Wrong!');
                      res.render('/editGiftR');
              }
              else{
                req.flash('success', 'The gift has been updated successfully!');
                res.redirect('/menulistR');
              }
      }); 

  }
  else {   //Display errors to user
      var error_msg = ''
      errors.forEach(function(error) {
          error_msg += error.msg + '<br>'
      })
      req.flash('error', error_msg)
       
      /**
       * Using req.body.name 
       * because req.param('name') is deprecated
       */
      res.render('/editGiftR', {          
          id: req.params.id, 
          nameGiftR:req.body.nameGiftR,
          priceGiftR:req.body.priceGiftR,
          categoryGiftR:req.body.categoryGiftR
      })
  }
})

/*method 1
adminProducts.post('/editGift:id', function (req, res, next) {
  console.log(req.params.id);
  Product.findOne({ _id: req.params.id }, function(err, data) {

      console.log(req.body)
      if (!data) {
          res.redirect('/menulist');

      } else {
          data.nameGift=req.body.nameGift;
          data.priceGift=req.body.priceGift;
          data.categoryGift=req.body.categoryGift;
    
          data.save(function(err, Gift) {
              if (err)
                  console.log(err);
              else {
                  console.log('Success');
                  return res.render('./admin/editGift.ejs', { "data": data });
              }
          });

      }
  });
});
*/
// delete gift
adminProductsR.get('/deleteProductR/:id', function (req, res, next) {
  console.log(req.params.id);

  ProductsR.findByIdAndDelete({ _id: req.params.id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Delete Successfully',data);
      res.redirect('/menulistR');
    }
  });
});

//exports
module.exports = adminProductsR;
