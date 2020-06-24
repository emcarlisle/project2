const Router = require('express').Router;
const authRoutes = Router();
const passport = require('../../config/passport');
const { User } = require('../../models');

//Sign In.  Sign Up.  Sign Out.
authRoutes.route('/signin').post(passport.authenticate('local'), async (req, res) => {
  const id = {
    where: {
      email: req.body.email
    }
  }
  const dbUsers = await User.findOne(id);
  res.json(dbUsers);
});

authRoutes.route('/signup').post(async (req, res) => {
  console.log(req.body);
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(() => {
      res.redirect('/profile');
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

