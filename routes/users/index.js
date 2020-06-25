const Router = require('express').Router;
const { User } = require('../../models');
const { Post } = require('../../models');
const userRoutes = Router();

// GET route to find all Users and their Posts
userRoutes.route('/users').get(async (_req, res) => {
  const dbUsers = await User.findAll({
    include: [Post]
  });
  res.json(dbUsers);
});

userRoutes
  .route('/users/:id')
  .put(async (_req, res) => {
    res.status(501).end();
  })
  .delete(async (req, res) => {
    const options = {
      where: {
        id: req.params.id
      }
    };
    const dbUser = User.destroy(options);
    res.json(dbUser);
  });

userRoutes
  .route('/user_data')

  .get(async (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  })





module.exports = userRoutes;