var express = require('express');
var router = express.Router();

router.post('/set', function(req, res, next) {
  console.log(JSON.stringify(req));
  res.send('respond with a resource');
});

router.get('/get', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
