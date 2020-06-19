const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models/LogIn");

//User Authentication
module.exports = function(passport, db){

    passport.use(new LocalStrategy (
        function(username, password, done) {
            db.User.findOne({
                username: username
            }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, { message: 'Please give a valid username'});
                }

                if (!user.validPassword(password)) {
                    return done(null, false, { message: "hmmm... That password does not match the one we have on record."});
                }
            })
        }
    ));
}
