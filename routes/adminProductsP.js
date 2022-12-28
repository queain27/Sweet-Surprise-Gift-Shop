var express = require('express');
var adminProductsP = express.Router();

//get gift model
var ProductsP = require('../models/giftP');

var multer = require('multer');
const { path } = require('express/lib/application');
const res = require('express/lib/response');
const path5 = require('path');
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

adminProductsP.get('/addGiftP', (req, res) => {
  return res.render('./admin/addGiftP.ejs');
});

//add gift without image yet
//adminProducts.post('/addGift', upload1, (req, res) => {
adminProductsP.post('/addGiftP', (req, res) => {
  console.log(req.body);
  var P;
  var newGiftP = {
    unique_id: P,
    nameGiftP: req.body.nameGiftP,
    //imageGiftP: req.file.filename,
    priceGiftP: req.body.priceGiftP,
    categoryGiftP: req.body.categoryGiftP,
  };

  ProductsP.create(newGiftP, (err, GiftP) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      console.log('Gift is added!');
      res.redirect('/menulistP');
    }
  });
});

//display dekat admin page
adminProductsP.get('/menulistP', (req, res) => {
  console.log('menulistP');
  ProductsP.find({}, function (err, data) {
    console.log('MenuData');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./admin/MenuListP.ejs', { data: data });
    }
  });
});

//nk display dekat user page 
adminProductsP.get('/package', (req, res) => {
  console.log('package menu list ');
  ProductsP.find({}, function (err, data) {
    console.log('MenuData');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./user/Package.ejs', { data: data });
    }
  });
});
//Get edit gift without image

adminProductsP.get('/editGiftP:id', function (req, res, next) {
  console.log(req.params.id);
  console.log('gifteu');

  ProductsP.findOne({ _id: req.params.id }, function (err, data) {
    console.log('gifteu editeu');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./admin/editGiftP.ejs', { data: data });
    }
  });
});

//post edit gift in package menu without image
/*method 1
adminProducts.post('/editGiftP:id', function (req, res, next) {
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
                  return res.render('./admin/editGiftP.ejs', { "data": data });
              }
          });

      }
  });
});

*/
// delete gift
adminProductsP.get('/deleteProductP/:id', function (req, res, next) {
  console.log(req.params.id);

  ProductsP.findByIdAndDelete({ _id: req.params.id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Delete Successfully',data);
      res.redirect('/menulistP');
    }
  });
});

//exports
module.exports = adminProductsP;
