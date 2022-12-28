var express = require('express');
var adminProducts = express.Router();

//get gift model
var Product = require('../models/gift');

var multer = require('multer');
const { path } = require('express/lib/application');
const res = require('express/lib/response');
const path2 = require('path');
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

adminProducts.get('/addGift', (req, res) => {
  return res.render('./admin/addGift.ejs');
});

//add gift without image yet
//adminProducts.post('/addGift', upload1, (req, res) => {
adminProducts.post('/addGift', (req, res) => {
  console.log(req.body);
  var g;
  var newGift = {
    unique_id: g,
    nameGift: req.body.nameGift,
    //imageGift: req.file.filename,
    priceGift: req.body.priceGift,
    categoryGift: req.body.categoryGift,
  };

  Product.create(newGift, (err, Gift) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      console.log('Gift is added!');
      res.redirect('/menulist');
    }
  });
});

//route to menu list page 
adminProducts.get('/menulisthome', (req, res) => {
  return res.render('./admin/menulisthome.ejs');
});

// nak display dekat admin standard menu
adminProducts.get('/menulist', (req, res) => {
  console.log('menulist');
  Product.find({}, function (err, data) {
    console.log('MenuData');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./admin/MenuList.ejs', { data: data });
    }
  });
});

//nk display dekat user page standard menu
adminProducts.get('/standard', (req, res) => {
  console.log('standard menu list ');
  Product.find({}, function (err, data) {
    console.log('MenuData');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./user/Standard.ejs', { data: data });
    }
  });
});

//Get edit gift without image

adminProducts.get('/editGift:id', function (req, res, next) {
  console.log(req.params.id);
  console.log('gifteu');

  Product.findOne({ _id: req.params.id }, function (err, data) {
    console.log('gifteu editeu');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./admin/editGift.ejs', { "data": data });
    }
  });
});

//post edit gift without image
//method 1

adminProducts.post('/editGift:id', (req, res) => {
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
                  res.redirect('/menulist');
              }
          });

      }
  });
});

// delete gift
adminProducts.get('/deleteProduct/:id', function (req, res, next) {
  console.log(req.params.id);

  Product.findByIdAndDelete({ _id: req.params.id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Delete Successfully',data);
      res.redirect('/menulist');
    }
  });
});

//exports
module.exports = adminProducts;
