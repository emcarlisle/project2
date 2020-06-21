const Router = require('express').Router;
const authRoutes = Router();
const passport = require('../../config/passport');
const { User } = require('../../models');

//Two Things.  Sign In.  Sign Up.  Sign Out.
authRoutes.route('/signin').post(passport.authenticate('local'), (req, res) => {
  res.json({
    email: req.body.email,
    id: req.body.id
  });
});

authRoutes.route('/signup').post((req, res) => {
    console.log(req.body);
  User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      res.status(401).json({ message: err });
    });
});

authRoutes.route('/signout').post((req, res) => {
  if (!req.user) {
    res.end();
  }

  res.redirect('/signup');
});

module.exports = authRoutes;