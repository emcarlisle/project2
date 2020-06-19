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
