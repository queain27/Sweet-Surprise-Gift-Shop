var express = require('express'): 
var env = require('dotenv').config();
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flass = require('connect-flash');
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');

mongoose.connect(
  'mongodb+srv://queain27:queain27@cluster0.nwtzp.mongodb.net/sweetsurprise?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.');
    } else {
      console.log('Error in DB connection : ' + err);
    }
  }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});

app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

// Express fileUpload middleware
app.use(fileUpload());

// Body Parser middleware
//
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//set routes
var index = require('./routes/index');
var adminProducts = require('./routes/adminProducts');
var adminProductsM = require('./routes/adminProductsM');
var adminProductsR = require('./routes/adminProductsR');
var adminProductsP = require('./routes/adminProductsP');
var cart = require('./routes/cart');


app.use('/', index);
app.use('/', adminProducts);
app.use('/', adminProductsM);
app.use('/', adminProductsR);
app.use('/', adminProductsP);
app.use('/', cart);


//cart purpose
app.get('*', function(req,res,next) {
  res.locals.cart = req.session.cart;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/views/user/img'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flass());
const flash = require('connect-flash/lib/flash');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

const PORT = process.env.PORT || 4050;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:' + PORT);
});
