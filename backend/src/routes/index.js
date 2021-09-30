
'use strict';

const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const routes = new Router();


routes.post('/register', UserController.create);
routes.post('/authenticate', UserController.authenticate);


module.exports = routes;