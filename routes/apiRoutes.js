const Router = require('express').Router;
const postRoutes = require('./posts');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const apiRoutes = Router();

apiRoutes.use('/posts', postRoutes);
apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/users', userRoutes);

module.exports = apiRoutes;
