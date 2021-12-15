var express = require("express");
var router = express.Router();
var auctionService = require("./../services/auction_service");
router.post("/add", function (req, res, next) {
  let response = {};
  auctionService
    .addAuctionEntry(req.body)
    .then(() => {
      response.type = "success";
      response.messege = "Auction entry added";
      res.send(JSON.stringify(response));
    })
    .catch(() => {
      response.type = "error";
      response.messege = "Failed";
      res.send(JSON.stringify(response));
    });
});

router.get("/getEntriesByCar", function (req, res, next) {
  let response = {};
  auctionService
    .getAuctionEntriesByCarName(req.query)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch(() => {
      response.type = "error";
      response.messege = "Failed";
      res.send(JSON.stringify(response));
    });
});

router.get("/get", function (req, res, next) {
  res.send("respond with a resource");
});
module.exports = router;
