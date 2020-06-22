const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

//User Authentication

passport.use(new LocalStrategy(
    function (username, password, done) {
        db.User.findOne({
            where: {
                username
            }
        }).then(function (user) {

            if (!user) {
                return done(null, false, { message: 'Please give a valid username' });
            }

            if (!user.validPassword(password)) {
                return done(null, false, { message: "hmmm... That password does not match the one we have on record." });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

module.exports = passport;
