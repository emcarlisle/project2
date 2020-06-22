const Router = require('express').Router;
//const { Post } = require('../../models');
const db = require('../../models');
const postRoutes = Router();

//********* DOUBLE CHECK THIS*/
postRoutes
  .route('/all')

  // API DOC: LIST ALL PUBLIC POSTS TO INDEX --> GET
  .get(async (_req, res) => {
    const dbPosts = await Post.findAll();
    res.json(dbPosts);
  })
// ******/

postRoutes
  .route('/')

  // API DOC: RETRIEVE CURRENT USERS POST(S) referencing(Act 14 post route)--> GET
  .get(async (_req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    const userPosts = await Post.findAll({
      where: query,
      include: [db.User]
    })
    res.json(userPosts);
  })

postRoutes
  .route('/')
  // API DOC: SUBMIT A POST (create a new Post) --> POST  
  .post(async (_req, res) => {
    const newPost = await Post.create(req.body);
    res.json(newPost);
  });


// API DOC: RETRIEVE A SINGLE POST BY SEARCH --> GET
postRoutes
  .route('/:id')

  .get(async (_req, res) => {
    const singlePost = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    })
    res.json(singlePost);
  })





//const Sequelize = require("sequelize");
//const Operator = Sequelize.Op;


// GET route for retrieving all posts
// postRoutes
//   .route('/api/posts')

//   .get(async (_req, res) => {
//     const dbPosts = await Post.findAll();
//     res.json(dbPosts);
//   })

//   .post(async (req, res) => {
//     console.log(req.body);
//     const dbPosts = await Post.create(req.body);
//     res.json(dbPosts);
//   });

// //GET route for searching for a Post by id
// postRoutes
//   .route('/api/posts/:id')

//   .get(async (_req, res) => {
//     const dbPost = await Post.findOne({
//       where: {
//         id: req.params.id
//       },
//       include: [db.User]
//     })
//     res.json(dbPost);
//   })

//   .post(async (req, res) => {
//     console.log(req.body);
//     const dbPost = await Post.create(req.body);
//     res.json(dbPost);
//   });



// //postRoutes
// //  .route('/search/:searchitem')
// //
// //  .get(async (req, res) => {
// //    console.log(req.params.searchitem);
// //    // use post id instead of title
// //    const dbPosts = await Post.findAll({ where: { title: {[Operator.like]:`%${req.params.searchitem}%`} } });
// //    console.log(dbPosts);
// //    res.json(dbPosts);
// //  })
// //
// //  .post(async (req, res) => {
// //    const dbPost = await Post.create(req.body);
// //    res.json(dbPost);
// //  });
// //

// //  POST route to CREATE/save a new Post
// postRoutes
//   .route('/api/post')

//   .post(async (req, res) => {
//     const dbNewPost = await Post.create(req.body);
//     res.json(dbNewPost);
//   });




// // DELETE a Post by id
// postRoutes
//   .route('/:id')
//   .put(async (_req, res) => {
//     res.status(501).end();
//   })
//   .delete(async (req, res) => {
//     const options = {
//       where: {
//         id: req.params.id
//       }
//     };
//     const dbPost = await Post.destroy(options);
//     res.json(dbPost);
//   });

module.exports = postRoutes;
