const express = require("express");
const morgan = require('morgan');
var indexRouter = require('./routes/index.routes');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const passport = require('passport')

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const { ExtractJwt, Strategy } = require('passport-jwt');


app.use('/knowledgehub', indexRouter);
require("dotenv").config();


/** Passport initialize */
app.use(passport.initialize());

/** Passport session */
app.use(passport.session());

var opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([extractor]),
  secretOrKey: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER
}

passport.use(new Strategy(opts, async function (user, done) {

  try {

    done(undefined, user)

  }
  catch (err) {
    // console.log(err)
    done(err, undefined)
  }

}))

function extractor(req) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['x-access-token'];
  return token;
}

require('./utils/socket');
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

// app.use(function (req, res, next) {
//     next(createError(404));
//   });
//   require('./utils/socket');
  // error handler
//   app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
// });

app.listen(3421,()=>{
    console.log("Port Run Localhost:3421");
})