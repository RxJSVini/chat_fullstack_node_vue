'use strict';
const ValidadeUser = require('../middlewares/validade_user.middleware');
const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const ChannelController = require('../controllers/channel.controller');
const routes = new Router();

//Rotas de usuários
routes.get('/users',ValidadeUser.validadeToken,  UserController.index)
routes.post('/register', UserController.create);
routes.post('/authenticate',UserController.authenticate);

//Rotas  de canais
routes.get('/create_channel',ChannelController.create);
module.exports = routes;