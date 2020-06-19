const Router = require('express').Router;
const postRoutes = require('./posts');

const apiRoutes = Router();

apiRoutes.use('/posts', postRoutes);

//Create a new user
apiRoutes.post("/signup", (req, res) => {
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }).then(() => {
        res.redirect(307, "/login");
    });
});

//Login
// apiRoutes.post('/login', passport("local"), (req, res) => {
//     if (!req.user) {
//         res.json({});
//     }
//     res.json({
//         username: req.user.email,
//         id: req.user.id
//     })
// });

//

module.exports = apiRoutes;

