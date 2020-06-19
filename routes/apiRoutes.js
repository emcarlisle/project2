const router = require('express').Router;
//const exampleRoutes = require('./examples');
const postRoutes = require('./posts');
router.use('/posts', postRoutes);

// this route gets all posts
router.get('/api/post', (req, res) => {
    db.Post.findAll({}).then(post => {
        res.json(post);
    })
})

//apiRoutes.use('/examples', exampleRoutes);

//Create a new user
router.post("/signup", (req, res) => {
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }).then(() => {
        res.redirect(307, "/api/login");
    });
});

//Login
router.post('/login', passport("local"), (req, res) => {
    if (!req.user) {
        res.json({});
    }
    res.json({
        username: req.user.email,
        id: req.user.id
    })
});

module.exports = router;
