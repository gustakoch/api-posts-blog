const express = require('express');
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.get('/api/postagens', authMiddleware, postController.getPosts);
routes.post('/api/postagens', authMiddleware, postController.savePost);

routes.post('/api/usuario/cadastro', userController.registerNewUser);
routes.post('/api/usuario/autenticar', userController.authUser);

module.exports = routes;
