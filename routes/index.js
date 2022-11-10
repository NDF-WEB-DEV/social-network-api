const router = require('express').Router();
const apiRoutes = require('./api');  //points or links to the api directory

router.use('/api', apiRoutes);  //origin route for all api routes

module.exports = router;