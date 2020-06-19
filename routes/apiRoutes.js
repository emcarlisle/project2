const router = require('express').Router;
//const exampleRoutes = require('./examples');
const db = require('../models');

//const apiRoutes = Router();

// this route gets all posts
router.get('/api/post', (req, res) => {
    db.Post.findAll({}).then(post => {
        res.json(post);
    })
})


//apiRoutes.use('/examples', exampleRoutes);


module.exports = router;

apiRoutes.get("/api/all", function (req, res) {
    
});

apiRoutes.post("/api/post/:id", function (req, res) {

});

apiRoutes.delete("/api/post/:id", function (req, res) {

});

apiRoutes.put("/api/post", function (req, res) {

});


module.exports = apiRoutes;

//create post

//save post
//get all saved
//get specific post
//delete saved post
//update a post
