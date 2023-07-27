const express = require('express');
const route = express.Router();
const controller = require('../controller/controller')

const services = require('../services/render');

route.get('/',services.homeRoutes);
route.get('/',services.update_user);
route.get('/details',services.details);

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete)



module.exports =  route