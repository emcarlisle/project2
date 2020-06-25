const Router = require('express').Router;
const db = require('../models');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const htmlRoutes = new Router();

// Route to index (sign-in page) --must be logged in, will direct to sign up page
htmlRoutes.get('/', async (req, res) => {
  if (req.user) {
    res.redirect('/homepage')
  }
  res.render('index');
});

// Route to signup page
htmlRoutes.get('/signup', async (req, res) => {
  res.render('signUp');
});

htmlRoutes.get('/signin', async (req, res) => {
  res.render('profile')
})

// route to profile
htmlRoutes.get('/homepage', isAuthenticated, async (req, res) => {
  const posts = await db.Post.findAll({
    attributes: ['id', 'body'],
    where: {
      UserId: req.user.id
    }
  });
  console.log(posts)
  res.render('profile', {
    Post: posts
  });
  
});
// Route to create a post  page
htmlRoutes.get('/posts/create', isAuthenticated, async (req, res) => {
  //if user is logged in let them access otherwise send them to login page
  res.render('createPost');
});



// Route to get post by id
htmlRoutes.get('/posts/:id', async (req, res) => {
  // getting posts from database
  const posts = {
    where: {
      id: req.params.id
    }
  };

  const dbPost = await db.Post.findOne({
    where: {
      PostId: posts.id
    }
  });
  res.render('profile', {
    Post: dbPost
  });
});


htmlRoutes.get('/signout', function (req, res) {
  req.logout();
  res.redirect('/');
});


// Render 404 page for any unmatched routes
htmlRoutes.get('*', async (req, res) => {
  res.render('404');
});







// const Router = require('express').Router;
// const db = require('../models');
// //const path = require("path");

// const htmlRoutes = new Router();


// // HTML Route to index (render info on loading)
// htmlRoutes.get('/', async (req, res) => {
//   const dbPosts = await db.Post.findAll();

//   res.render('index', {
//     msg: 'Welcome!',
//     posts: dbPosts
//   });
// });

// //Render Post page with content by id
// htmlRoutes.get('/post/:id', async (req, res) => {
//   const options = {
//     where: {
//       id: req.params.id
//     }
//   };

//   const dbPost = await db.Post.findOne(options);

//   res.render('post', {
//     post: dbPost
//   });
// });


// htmlRoutes.get('/signup', async (req, res) => {
//   res.render('signup');
// });

// htmlRoutes.get('/profile', async (req, res) => {
//   res.render('profile');
// })

// // Render 404 page for any unmatched routes
// htmlRoutes.get('*', async (req, res) => {
//   res.render('404');
// });

//==================passport html routes=========================================
//Login Html route
//htmlRoutes.get('/', (req, res) => {
//  if (req.user) {
//    res.redirect("/profile");
//  }
//  sendFile(path.join(_dirname, "/signup"));
//})
//
//htmlRoutes.get('/', (req, res) => {
//  if (req.user) {
//    res.redirect("/profile");
//  }
//  //if user does not exist, send them back to the login page
//  res.sendFile(path.join(_dirname, "../login"));
//})

module.exports = htmlRoutes;
