var express = require('express');
var router = express.Router();

const { Server } = require("socket.io");
const io = new Server(server);
const auctionRoomName = 'auction room';
const priceUpdateEventName = 'price updated';
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.join(auctionRoomName);
});


/* GET users listing. */
router.setPrice('/', function(req, res, next) {
  io.to(auctionRoomName).emit(priceUpdateEventName);
  res.send('respond with a resource');
});
router.getPrice('/', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
