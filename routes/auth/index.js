const Router = require('express').Router;
const authRoutes = Router();
const passport = require('../../config/passport');
const { User } = require('../../models');

//Sign In.  Sign Up.  Sign Out.

authRoutes.post('/signin', passport.authenticate('local'), (req, res) => {
  res.json({
    //name: req.user.name,
    email: req.user.email,
    password: req.user.password
  });
});

authRoutes.post('/signup', (req, res) => {
  User.create({
    //name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(() => {

      res.end();
    
    })
    .catch((err) => {
      res.status(401).json({ message: err });
    });
});

authRoutes.get('/user_data', (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    res.json({
      //name: req.user.name,
      email: req.user.email,
      id: req.user.id
    });
  }
});


authRoutes.delete('/posts/delete/:id', async (req, res) => {
  const options = {
      where: {
          id: req.params.id
      }
  };
  const dbExample = await db.Surveys.destroy(options);
  res.json(dbExample);

});

module.exports = authRoutes;

