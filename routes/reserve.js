

var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    passport    = require('passport'),
    middleware = require('../middleware'),
    User = require('../models/user'),
    Movies = require('../models/movies'),
    Cinema = require('../models/location'),
    Reserve = require('../models/reserve'),
    Seat = require('../models/seat');


/* ------------- goto select seat -------------------*/ 

router.post('/select-seat/:id_movie', middleware.isLoggedIn,function(req,res){
    Movies.findById(req.params.id_movie , function(err, foundMovie){
        if(err){
            console.log(err);
        } else{
            console.log(req.body.select.theater);
            console.log(req.body.select.date);
            Cinema.findOne({theater:{ $elemMatch: {_id:req.body.select.theater}}}, function(err, foundseat){
                if(err){
                    console.log(err);
                }else{
                    Seat.find({}, function(err, found){
                        if(err){
                            console.log(err);
                        }else{
                            console.log(foundseat);
                            console.log('foundmovies-seat');
                            res.render('select-seat.ejs',{movie: foundMovie, date: req.body.select.date, time:req.body.select.time, location:foundseat, theater_id:req.body.select.theater, seat_id:found});
                        }
                    });

                }
            }); 
        }
    });
   
})

router.post('/', middleware.isLoggedIn, function(req, res){
    console.log(req.body.reserve.seat_id);
    User.findById(req.user._id, function(err, founduser){
        if(err){
            console.log(err);
        }else{
            Cinema.findOne({theater:{ $elemMatch: {seats:req.body.reserve.seat_id}}}, function(err, foundseat){
                if(err){
                    console.log(err);
                }else{
                    console.log(foundseat);
                    Reserve.create(req.body.reserve, function(err, reserve){
                        if(err){
                            console.log(err);
                        }else{
                            reserve.user.id = req.user._id;
                            reserve.user.username = req.user.username;
                            reserve.save();
                            foundseat.reservation.push(reserve);
                            foundseat.save();
                            founduser.reservation.push(reserve);
                            founduser.save();
                            /* --------- seat row A --------------*/
                            if( req.body.A1 == 'y') {
                                reserveSeat('A1', reserve._id);
                            }
                            if( req.body.A2 == 'y') {
                                reserveSeat('A2', reserve._id);
                            }
                            if( req.body.A3 == 'y') {
                                reserveSeat('A3', reserve._id);
                            }
                            if( req.body.A4 == 'y') {
                                reserveSeat('A4', reserve._id);
                            }
                            if( req.body.A5 == 'y') {
                                reserveSeat('A5', reserve._id);
                            }
                            if( req.body.A6 == 'y') {
                                reserveSeat('A6', reserve._id);
                            }
                            if( req.body.A7 == 'y') {
                                reserveSeat('A7', reserve._id);
                            }
                            if( req.body.A8 == 'y') {
                                reserveSeat('A8', reserve._id);
                            }
                            /* --------- seat row B --------------*/
        
                            if( req.body.B1 == 'y') {
                                reserveSeat('B1', reserve._id);
                            }
                            if( req.body.B2 == 'y') {
                                reserveSeat('B2', reserve._id);
                            }
                            if( req.body.B3 == 'y') {
                                reserveSeat('B3', reserve._id);
                            }
                            if( req.body.B4 == 'y') {
                                reserveSeat('B4', reserve._id);
                            }
                            if( req.body.B5 == 'y') {
                                reserveSeat('B5', reserve._id);
                            }
                            if( req.body.B6 == 'y') {
                                reserveSeat('B6', reserve._id);
                            }
                            if( req.body.B7 == 'y') {
                                reserveSeat('B7', reserve._id);
                            }
                            if( req.body.B8 == 'y') {
                                reserveSeat('B8', reserve._id);
                            }
                            /*------------- seat row C -----------*/
                            if( req.body.C1 == 'y') {
                                reserveSeat('C1', reserve._id);
                            }
                            if( req.body.C2 == 'y') {
                                reserveSeat('C2', reserve._id);
                            }
                            if( req.body.C3 == 'y') {
                                reserveSeat('C3', reserve._id);
                            }
                            if( req.body.C4 == 'y') {
                                reserveSeat('C4', reserve._id);
                            }
                            if( req.body.C5 == 'y') {
                                reserveSeat('C5', reserve._id);
                            }
                            if( req.body.C6 == 'y') {
                                reserveSeat('C6', reserve._id);
                            }
                            if( req.body.C7 == 'y') {
                                reserveSeat('C7', reserve._id);
                            }
                            if( req.body.C8 == 'y') {
                                reserveSeat('C8', reserve._id);
                            }
                              /*------------- seat row D -----------*/
                              if( req.body.D1 == 'y') {
                                reserveSeat('D1', reserve._id);
                            }
                            if( req.body.D2 == 'y') {
                                reserveSeat('D2', reserve._id);
                            }
                            if( req.body.D3 == 'y') {
                                reserveSeat('D3', reserve._id);
                            }
                            if( req.body.D4 == 'y') {
                                reserveSeat('D4', reserve._id);
                            }
                            if( req.body.D5 == 'y') {
                                reserveSeat('D5', reserve._id);
                            }
                            if( req.body.D6 == 'y') {
                                reserveSeat('D6', reserve._id);
                            }
                            if( req.body.D7 == 'y') {
                                reserveSeat('D7', reserve._id);
                            }
                            if( req.body.D8 == 'y') {
                                reserveSeat('D8', reserve._id);
                            }
                              /*------------- seat row E -----------*/
                              if( req.body.E1 == 'y') {
                                reserveSeat('E1', reserve._id);
                            }
                            if( req.body.E2 == 'y') {
                                reserveSeat('E2', reserve._id);
                            }
                            if( req.body.E3 == 'y') {
                                reserveSeat('E3', reserve._id);
                            }
                            if( req.body.E4 == 'y') {
                                reserveSeat('E4', reserve._id);
                            }
                            if( req.body.E5 == 'y') {
                                reserveSeat('E5', reserve._id);
                            }
                            if( req.body.E6 == 'y') {
                                reserveSeat('E6', reserve._id);
                            }
                            if( req.body.E7 == 'y') {
                                reserveSeat('E7', reserve._id);
                            }
                            if( req.body.E8 == 'y') {
                                reserveSeat('E8', reserve._id);
                            }
                              /*------------- seat row F -----------*/
                              if( req.body.F1 == 'y') {
                                reserveSeat('F1', reserve._id);
                            }
                            if( req.body.F2 == 'y') {
                                reserveSeat('F2', reserve._id);
                            }
                            if( req.body.F3 == 'y') {
                                reserveSeat('F3', reserve._id);
                            }
                            if( req.body.F4 == 'y') {
                                reserveSeat('F4', reserve._id);
                            }
                            if( req.body.F5 == 'y') {
                                reserveSeat('F5', reserve._id);
                            }
                            if( req.body.F6 == 'y') {
                                reserveSeat('F6', reserve._id);
                            }
                            if( req.body.F7 == 'y') {
                                reserveSeat('F7', reserve._id);
                            }
                            if( req.body.F8 == 'y') {
                                reserveSeat('F8', reserve._id);
                            }
                            res.redirect('/');
                        }
                    });
                    req.flash('success', 'reserve complete');
                }
            });
            function reserveSeat(seat, reserve) {
                Seat.findByIdAndUpdate(req.body.reserve.seat_id, { $pull: { seats:seat} }, function(err, foundSeat){
                    if(err){
                        console.log(err);
                    } else {
                        Reserve.findByIdAndUpdate(reserve._id, { $push: { seats:seat } }, {new: true}, function(err, foundReserve) {
                            if(err){
                                console.log(err);
                            } else {
                                console.log('Reserve Seat : ' + seat);
                            }
                        });
                    }
                });
            }
        }
    });
   

});
module.exports = router;