var express = require("express");

var router = express.Router();

//---------------users Routes--------------------//

var UserRouter = require('./user.routes');
router.use('/users',UserRouter);

//----------------feeds routes-------------------//

var FeedRouter = require('./feeds.routes');
router.use('/feeds',FeedRouter)

module.exports=router;