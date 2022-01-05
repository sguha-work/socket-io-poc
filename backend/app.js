var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//const https = require('https');

var indexRouter = require("./routes/index");
var auctionRouter = require("./routes/auction");
var userRouter = require("./routes/user.js");
var carRouter = require("./routes/car.js");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

var cors = require("cors");
app.use(
  cors({
    origin: "*",
    // origin:'http://localhost:4200'
  })
);

var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://angshu_mongo:HhWjjsZoi1wDqZkj@cluster0.1f9ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auction", auctionRouter);
app.use("/users", userRouter);
app.use("/cars", carRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
