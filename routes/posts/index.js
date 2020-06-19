const Router = require('express').Router;
const { Post } = require('../../models');

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