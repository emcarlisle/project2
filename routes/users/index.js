const Router = require('express').Router;
const { User } = require('../../models');
const { Post } = require('../../models');
const userRoutes = Router();

// GET route to find all Users and their Posts
userRoutes.route('/').get(async (_req, res) => {
  const dbUsers = await User.findAll({
    include: [Post]
  });
  res.json(dbUsers);
});


// GET route to get a User by ID
//userRoutes.route('/:id').get(async (_req, res) => {
//  const dbUser = await User.findOne({
//    where: {
//      id: _req.params.id
//    },
//    include: [Post]
//  });
//  res.json(dbUser);
//});

// DELETE route for deleting a User by Id
//(which should delete posts associated with that User's ID)

userRoutes
  .route('/:id')
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

module.exports = userRoutes;