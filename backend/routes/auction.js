
var express = require('express');
var router = express.Router();
// var auctionService = require('./../services/auction_service');
router.post('/set', function(req, res, next) {
  console.log(JSON.stringify(req));
  res.send('respond with a resource');
});

router.get('/get', function(req, res, next) {
  // console.log(auctionService.getLiveAuctionList());
  res.send('respond with a resource');
});
module.exports = router;
