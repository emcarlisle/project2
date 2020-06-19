const Router = require('express').Router;
const exampleRoutes = require('./examples');

const apiRoutes = Router();

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
