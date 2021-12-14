var express = require("express");
var router = express.Router();
var carService = require("./../services/car_service");

router.post("/add", function (req, res, next) {
  console.log(JSON.stringify(req.body));
  let response = {};
  carService
    .add(req.body)
    .then(() => {
        response.type="success";
        response.messege = "New car addition successfull";
        res.send(JSON.stringify(response));      res.send("");
    })
    .catch(() => {
        response.type="error";
        response.messege = "New car addition failed";
        res.send(JSON.stringify(response));
    });
});
module.exports = router;
