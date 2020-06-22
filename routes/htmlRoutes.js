const Router = require('express').Router;
const db = require('../models');
const path = require("path");
const authenticated = require('../config/Authenticate');

const htmlRoutes = new Router();

htmlRoutes.get('/', async (req, res) => {
  const dbPosts = await db.Post.findAll({});

  res.render('index', {
    msg: 'Welcome!',
    post: dbPosts
  });
});

// Load example page and pass in an example by id
htmlRoutes.get('/example/:id', async (req, res) => {
  const options = {
    where: {
      id: req.params.id
    }
  };

  const dbExample = await db.Example.findOne(options);

  res.render('example', {
    example: dbExample
  });
});

htmlRoutes.get('/signup', async (req, res) => {
  res.render('signup');
});

htmlRoutes.get('/profile', async (req, res) => {
  res.render('profile');
})

// Render 404 page for any unmatched routes
htmlRoutes.get('*', async (req, res) => {
  res.render('404');
});

//==================passport html routes=========================================
//Login Html route
htmlRoutes.get('/login', (req, res) => {
  if (req.user) {
    res.redirect("/profile");
  }
  sendFile(path.join(_dirname, "../signup.handlebars"));
})

htmlRoutes.get('/', (req, res) => {
  if (req.user) {
    res.redirect("/profile.handlebars");
  }
  //if user does not exist, send them back to the login page
  res.sendFile(path.join(_dirname, "../login"));
});

htmlRoutes.get("/profile", authenticated, function(req, res) {
  res.sendFile(path.join(_dirname, "../public/profile.handlebars"))
});

module.exports = htmlRoutes;
