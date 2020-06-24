const Router = require('express').Router;
const { Post } = require('../../models');
//const { User } = require('../../models');
const postRoutes = Router();

postRoutes
  .route('/posts')

  // GET route for getting all of the Posts
  .get(async (_req, res) => {
    //const user_id = req.params.id;
    const dbPosts = await Post.findAll();
    res.json(dbPosts);
  })

  // POST route for creating a new Post
  .post(async (req, res) => {
    console.log(req.body)
    const dbPost = await Post.create(req.body);
    res.json(dbPost);
  })
  
  // DELETE route for deleting a Post by id
postRoutes
  .route('/posts/:id')

  .put(async (_req, res) => {
    res.status(501).end();
  })
  .delete(async (req, res) => {
    const options = {
      where: {
        id: req.params.id
      }
    };
    const deletedPost = await Post.destroy(options);
    res.json(deletedPost);
  });

module.exports = postRoutes;









