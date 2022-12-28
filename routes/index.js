var express = require('express');
var flash = require('connect-flash');
var router = express.Router();
var User = require('../models/user');

var multer = require('multer');
const { path } = require('express/lib/application');
const res = require('express/lib/response');
const path2 = require('path');
const { mongo } = require('mongoose');
const { MongoStore } = require('connect-mongo');
const connectMongo = require('connect-mongo');
const { assert } = require('console');
/*var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './views/picture');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path2.extname(file.originalname));
  },
});

var upload = multer({ storage: storage }); */
// main page
router.get('/', function (req, res, next) {
  return res.render('./user/mainpage.ejs');
});
//cust register
router.get('/register', function (req, res, next) {
  return res.render('./user/register.ejs');
});

router.post('/register', function (req, res, next) {
  console.log(req.body);
  var personInfo = req.body;

  if (
    !personInfo.email ||
    !personInfo.username ||
    !personInfo.password ||
    !personInfo.passwordConf
  ) {
    res.send();
  } else {
    if (personInfo.password == personInfo.passwordConf) {
      User.findOne({ email: personInfo.email }, function (err, data) {
        if (!data) {
          var c;
          User.findOne({}, function (err, data) {
            if (data) {
              console.log('if');
              c = data.unique_id + 1;
            } else {
              c = 1;
            }

            var newPerson = new User({
              unique_id: c,
              email: personInfo.email,
              username: personInfo.username,
              Fname: personInfo.Fname,
              phoneNum: personInfo.phoneNum,
              password: personInfo.password,
              passwordConf: personInfo.passwordConf,
            });

            newPerson.save(function (err, Person) {
              if (err) console.log(err);
              else console.log('Success');
            });
          })
            .sort({ _id: -1 })
            .limit(1);
          res.send({ Success: 'You are regestered,You can login now.' });
        } else {
          res.send({ Success: 'Email is already used.' });
        }
      });
    } else {
      res.send({ Success: 'password is not matched' });
    }
  }
});

//cust login
router.get('/login', function (req, res, next) {
  return res.render('./user/login.ejs');
});

router.post('/login', function (req, res, next) {
  //console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, data) {
    if (data) {
      if (data.password == req.body.password) {
        //console.log("Done Login");
        req.session.userId = data.unique_id;
        //console.log(req.session.userId);
        res.send({ Success: 'Success!' });
      } else {
        res.send({ Success: 'Wrong password!' });
      }
    } else {
      res.send({ Success: 'This Email Is not registered!' });
    }
  });
});

//cust forget password
router.get('/forgetpass', function (req, res, next) {
  res.render('./user/forget.ejs');
});

router.post('/forgetpass', function (req, res, next) {
  //console.log('req.body');
  //console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, data) {
    console.log(data);
    if (!data) {
      res.send({ Success: 'This Email Is not regestered!' });
    } else {
      // res.send({"Success":"Success!"});
      if (req.body.password == req.body.passwordConf) {
        data.password = req.body.password;
        data.passwordConf = req.body.passwordConf;

        data.save(function (err, Person) {
          if (err) console.log(err);
          else console.log('Success');
          res.send({ Success: 'Password changed!' });
        });
      } else {
        res.send({
          Success: 'Password does not matched! Both Password should be same.',
        });
      }
    }
  });
});

router.get('/userhomepage', function (req, res, next) {
  console.log('profile');
  User.findOne({ unique_id: req.session.userId }, function (err, data) {
    console.log('data');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./user/userhomepage.ejs', { data: data });
    }
  });
});

//cust profile
router.get('/profile', function (req, res, next) {
  console.log('profile');
  User.findOne({ unique_id: req.session.userId }, function (err, data) {
    console.log('profile');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./user/profile.ejs', { data: data });
    }
  });
});

router.post('/updateprofile', (req, res) => {
  const id = req.session.userId;
  User.findOne({ unique_id: id }, function (err, data) {
    console.log(req.body);
    // res.send({"Success":"Success!"});
    if (!data) {
      res.redirect('/profile');
    } else {
      data.username = req.body.username;
      data.Fname = req.body.Fname;
      data.email = req.body.email;
      data.phoneNum = req.body.phoneNum;
      data.password = req.body.password;
      data.passwordConf = req.body.passwordConf;

      data.save(function (err, Person) {
        if (err) console.log(err);
        else console.log('Success');
        return res.render('./user/profile.ejs', {
          Success: 'profile info saved!',
          data: data,
        });
      });
    }
  });
});
router.get('/updateprofile', function (req, res, next) {
  console.log('profile');
  User.findOne({ unique_id: req.session.userId }, function (err, data) {
    console.log('profile');
    console.log(data);
    if (!data) {
      res.redirect('/');
    } else {
      //console.log("found");
      return res.render('./user/updateprofile.ejs', { data: data });
    }
  });
});

//logout cust
router.get('/logout', function (req, res, next) {
  console.log('logout');

  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

//logout admin
router.get('/logoutA', function (req, res, next) {
  console.log('logoutA');

  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        document.querySelector(".third").addEventListener('click', function(){
          Swal("Bye", "You Have Successfully Log Out", "success");
          });
        return res.redirect('/');
      }
    });
  }
});

//admin login
const credential = {
  email: 'admin01@gmail.com',
  password: 'admin01',
};

router.post('/ALogin', (req, res) => {
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.a = req.body.email;

    res.redirect('/home');
    res.end('Successfully Login!!!');
  } else {
    res.end('Invalid Username');
  }
});

router.get('/ALogin', function (req, res, next) {
  return res.render('./admin/ALogin.ejs');
});

router.get('/home', function (req, res, next) {
  return res.render('./admin/home.ejs');
});

router.get('/loyalty', function (req, res, next) {
  return res.render('./user/loyalty.ejs');
});
/*
// Admin Products //
//route to menu page
router.get('/adminMenuList', (req, res) => {
  return res.render('/admin/MenuList.ejs');
});

//route to editgift page
router.get('/editGift', function (req, res, next) {
  console.log(
    'views',
    require('path').resolve(__dirname, './admin/editGift.ejs')
  );
  //return res.render('./admin/editGift.ejs');
});

//router to add gift 
router.get('/addGift', (req, res) => {
  return res.render('/admin/addGift.ejs');
});

*/

module.exports = router;
