const Router = require('express').Router;
const exampleRoutes = require('./examples');


const apiRoutes = Router();
//Create a new user
apiRoutes.post("/api/signup", (req, res) => {
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }).then(() => {
        res.rederect(307, "/api/login");
    });
});

//Login
apiRoutes.post('/api/login', passport("local"), (req, res) => {
    if (!req.user) {
        res.json({});
    }
    res.json({
        username: req.user.email,
        id: req.user.id
    })
});

//




module.exports = apiRoutes;

