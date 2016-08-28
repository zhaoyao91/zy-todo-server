const Router = require('express').Router;
const router = new Router();

router.use('/todos', require('./todos'));

module.exports = router;