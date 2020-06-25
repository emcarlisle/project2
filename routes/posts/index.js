const Router = require('express').Router;
const { Post } = require('../../models');
//const { User } = require('../../models');
const postRoutes = Router();

postRoutes
  .route('/posts/:id')

  // GET route for getting posts
  .get(async (req, res) => {
    //const user_id = req.params.id;
    const dbPosts = await Post.findAll({
      where: {
        PostId: req.params.PostId
      },
      include: [Post]
    });
    res.json(dbPosts);
  })


postRoutes
  .route('/posts')
  .post(async (req, res) => {
    //console.log(req)
    const dbPost = await Post.create({
      body: req.body.body
      //UserId: req.user.id
    });
    res.json(dbPost);
    console.log(dbPost);
  })
  
  // DELETE route for deleting a Post by id
postRoutes
  .route('/posts/:id')

  .put(async (req, res) => {
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



// POST route to make a new Post
// postRoutes
//   .route('/newPost')
//   .post(async (req, res) => {
//     console.log(req.body)
//     const dbPosts = await Post.create(req.body);
//     res.json(dbPosts);
//   });


module.exports = postRoutes;









