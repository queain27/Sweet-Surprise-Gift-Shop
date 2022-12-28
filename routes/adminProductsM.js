var express = require('express');
var adminProductsM = express.Router();

//get gift model
var ProductM = require('../models/giftM');

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

adminProductsM.get('/addGiftM', (req, res) => {
  return res.render('./admin/addGiftM.ejs');
});

//add gift without image yet
//adminProducts.post('/addGift', upload1, (req, res) => {
adminProductsM.post('/addGiftM', (req, res) => {
  console.log(req.body);
  var g;
  var newGift = {
    unique_id: g,
    nameGiftM: req.body.nameGiftM,
    //imageGift: req.file.filename,
    priceGiftM: req.body.priceGiftM,
    categoryGiftM: req.body.categoryGiftM,
  };

  ProductM.create(newGift, (err, Gift) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      console.log('Gift is added!');
      res.redirect('/menulistM');
    }
  });
});

//route to menu list page 
adminProductsM.get('/menulisthome', (req, res) => {
  return res.render('./admin/menulisthome.ejs');
});

// nak display dekat admin medium menu
adminProductsM.get('/menulistM', (req, res) => {
  console.log('menulistM');
  ProductM.find({}, function (err, data) {
    console.log('MenuData');
    console.log(data);
    if (!data) {
      res.redirect('/menulistM');
    } else {
      //console.log("found");
      return res.render('./admin/MenuListM.ejs', { data: data });
    }
  });
});

//nk display dekat user page standard menu
adminProductsM.get('/medium', (req, res) => {
  console.log('medium menu list ');
  ProductM.find({}, function (err, data) {
    console.log('MenuData');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./user/Medium.ejs', { data: data });
    }
  });
});

//Get edit gift without image

adminProductsM.get('/editGiftM:id', function (req, res, next) {
  console.log(req.params.id);
  console.log('gifteu');

  ProductM.findOne({ _id: req.params.id }, function (err, data) {
    console.log('gifteu editeu');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./admin/editGiftM.ejs', { "data": data });
    }
  });
});

//post edit gift without image
//method 1

adminProductsM.post('/editGiftM:id', (req, res) => {
  console.log(req.params.id);
  ProductM.findOne({ _id: req.params.id }, function(err, data) {

      console.log(req.body)
      if (!data) {
          res.redirect('/menulistM');

      } else {
          data.nameGiftM=req.body.nameGiftM;
          data.priceGiftM=req.body.priceGiftM;
          data.categoryGiftM=req.body.categoryGiftM;
    
          data.save(function(err, Gift) {
              if (err)
                  console.log(err);
              else {
                  console.log('Success');
                  res.redirect('/menulistM');
              }
          });

      }
  });
});

// delete gift
adminProductsM.get('/deleteProductM/:id', function (req, res, next) {
  console.log(req.params.id);

  ProductM.findByIdAndDelete({ _id: req.params.id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Delete Successfully',data);
      res.redirect('/menulistM');
    }
  });
});

//exports
module.exports = adminProductsM;
