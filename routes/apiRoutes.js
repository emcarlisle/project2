const Router = require('express').Router;
const postRoutes = require('./posts');
const db = require('../models');
const passport = require('passport');
const apiRoutes = Router();

apiRoutes.use('/posts', postRoutes);

//Create a new user then redirect to new profile page
apiRoutes.post("/signup", (req, res) => {
    //adds all user information into the user table
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        res.json(user);
    });
});

//Login
apiRoutes.post('/login', passport.authenticate('local'), function (req, res) {
    db.User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function (user) {
        res.json(user);
    });
});

//logout
apiRoutes.get('/logout', function (req, res) {
    req.logout();
    //redirects user to the login page
    res.redirect("/login");
})

//delete profile
apiRoutes.delete('/deleteProfile/:id', function (req, res) {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (user) {
        res.json(user)
    })
});

module.exports = apiRoutes;
