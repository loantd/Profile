const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('./../models/User')
const keys = require('../config/keys');

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = keys.secretOrkey;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({_id:jwt_payload.id} , function (err, user) {
      if(err){
        return done(err,false);
      }
      if(user){
        return done(null,user)
      }else{
        return
      }
    })
  }));
};
