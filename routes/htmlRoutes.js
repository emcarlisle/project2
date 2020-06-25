const Router = require('express').Router;
const db = require('../models');
//const path = require("path");

const htmlRoutes = new Router();


// HTML Route to index (render info on loading)
htmlRoutes.get('/', async (req, res) => {
  const dbPosts = await db.Post.findAll();

  res.render('index', {
    msg: 'Welcome!',
    posts: dbPosts
  });
});

//Render Post page with content by id
htmlRoutes.get('/post/:id', async (req, res) => {
  const options = {
    where: {
      id: req.params.id
    }
  };

  const dbPost = await db.Post.findOne(options);

  res.render('post', {
    post: dbPost
  });
});


htmlRoutes.get('/signup', async (req, res) => {
  res.render('signup');
});

htmlRoutes.get('/home', async (req, res) => {
  res.render('home');
})

// Render 404 page for any unmatched routes
htmlRoutes.get('*', async (req, res) => {
  res.render('404');
});

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
