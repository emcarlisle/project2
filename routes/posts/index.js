const Router = require('express').Router;
const { Post } = require('../../models');

const Sequelize = require("sequelize");
const Operator = Sequelize.Op;

const postRoutes = Router();

// Get all Posts
postRoutes
  .route('/')

  .get(async (_req, res) => {
    const dbPosts = await Post.findAll();
    res.json(dbPosts);
  })

  .post(async (req, res) => {
    const dbPost = await Post.create(req.body);
    res.json(dbPost);
  });

//Search route
postRoutes
  .route('/search/:searchitem')

  .get(async (req, res) => {
    console.log(req.params.searchitem);
    const dbPosts = await Post.findAll({ where: { title: {[Operator.like]:`%${req.params.searchitem}%`} } });
    console.log(dbPosts);
    res.json(dbPosts);
  })

  .post(async (req, res) => {
    const dbPost = await Post.create(req.body);
    res.json(dbPost);
  });

// Delete an Post by id
postRoutes
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
    const dbPost = await Post.destroy(options);
    res.json(dbPost);
  });

module.exports = postRoutes;
