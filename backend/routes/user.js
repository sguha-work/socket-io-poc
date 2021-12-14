var express = require("express");
var router = express.Router();
var userService = require("./../services/user_service");

router.post("/login", function (req, res, next) {
    let response = {};
  userService
    .login(req.body)
    .then(() => {
        response.type="success";
        response.messege = "success";
        res.send(JSON.stringify(response));
    })
    .catch(() => {
        response.type="error";
        response.messege = "error";
        res.send(JSON.stringify(response));
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
