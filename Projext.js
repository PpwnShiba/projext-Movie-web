
const express = require('express'),
      projext = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy   = require('passport-local'),
      multer = require('multer'),
      path = require('path'),
      middleware = require('./middleware'),

      storage = multer.diskStorage({
          destination: function(req, file, callback){
              callback(null,'./public/uploads/');
          },
          filename: function(req, file, callback){
                callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
          }
      }),
      imageFilter = function(req, file, callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
            return callback(new Error('Only JPG, jpeg, PNGm and GIF image files are allowed!'), false);
        }
        callback(null, true);
    },

    upload  = multer({storage: storage, fileFilter: imageFilter}),
    
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
      //database
      User = require('./models/user'),
      Movies = require('./models/movies'),
      Theater = require('./models/location'),
      Comment = require('./models/comments'),
      seedDB = require('./seedDB');


var moviesRoutes = require('./routes/movies'),
    indexRoutes = require('./routes/index'),
    commentRoutes = require('./routes/comments'),
    profileRoutes = require('./routes/user'),
    adminRoutes = require('./routes/admin'),
    reserveRoutes = require('./routes/reserve');
    cinemaRoutes = require('./routes/cinema');
        

mongoose.connect('mongodb://localhost/projext'); //connect to Database

projext.use(express.static('public'));
projext.use(bodyParser.urlencoded({extended: true}));
projext.set('view engine','ejs');
projext.use(methodOverride('_method'));
projext.use(express.static(__dirname+'public'));
projext.use(flash());-
// seedDB();


projext.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized: false
}));

projext.use(passport.initialize());
projext.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//ref to data of user

projext.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

projext.use('/', indexRoutes);

projext.use('/Movies', moviesRoutes);

projext.use('/movies/reserve', reserveRoutes);

projext.use('/movies/:id/new-comment', commentRoutes);

projext.use('/user', profileRoutes);

projext.use('/admin', adminRoutes);

projext.use('/cinemas', cinemaRoutes);


projext.listen('3000',function(req,res){
    console.log('Server is running');
});