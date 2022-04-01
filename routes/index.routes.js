var express = require("express");

var router = express.Router();

//---------------users Routes--------------------//

var UserRouter = require('./user.routes');
router.use('/users',UserRouter);

//----------------feeds routes-------------------//

var FeedRouter = require('./feeds.routes');
router.use('/feeds',FeedRouter)

//-----------------comments----------------------//

var CommentsRouter = require('./comments.routes');
router.use('/comments',CommentsRouter);

module.exports=router;