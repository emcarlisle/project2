const Router = require('express').Router;
const postRoutes = require('./posts');
const authRoutes = require('./auth');
const apiRoutes = Router();

apiRoutes.use('/posts', postRoutes);
apiRoutes.use('/auth', authRoutes);

module.exports = apiRoutes;
