const Router = require('express').Router;
const db = require('../models');
const path = require("path");
const authenticated = require('../config/Authenticate');

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

// Render 404 page for any unmatched routes
htmlRoutes.get('*', async (req, res) => {
  res.render('404');
});

//==================passport html routes=========================================

htmlRoutes.get("/profile", authenticated, function(req, res) {
  res.sendFile(path.join(_dirname, "../views/profile.handlebars"));
});

module.exports = htmlRoutes;
