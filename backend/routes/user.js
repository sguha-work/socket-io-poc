var express = require("express");
var router = express.Router();
var userService = require("./../services/user_service");

router.post("/login", function (req, res, next) {
  userService
    .login(req.body)
    .then(() => {
        res.send('success');
    })
    .catch(() => {
        res.send("error");
    });  
});
router.post("/register", function (req, res, next) {
  console.log(JSON.stringify(req.body));
  userService
    .register(req.body)
    .then(() => {
      res.send("Registration successfull");
    })
    .catch(() => {
      res.send("Registration failed");
    });
});
module.exports = router;
