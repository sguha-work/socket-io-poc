var Auction = require("./../models/auction");
var carService = require("./car_service");
var socketService = require("./socket_service");
module.exports = {
  getLiveAuctionList: () => {
    return [];
  },
  addAuctionEntry: (data) => {
    return new Promise((resolve, reject) => {
      let auction = new Auction({
        carId: data.carId,
        bidderId: data.bidderId,
        bidValue: data.bidValue,
      });
      auction
        .save()
        .then(() => {
          // updating car in db
          carService
            .updatePrice(data.carId, data.bidValue, data.bidderId)
            .then(() => {
              // emiting broadcast method by socket
              var socket = socketService.getSocketObj();
              //io.on("connection", (socket) => {console.log('emitting event');
                //socket.join(roomName);
                //io.to(roomName).emit('price updated', data);
                socket.emit("price updated", data);
              //});
              resolve();
            })
            .catch(() => {
              reject();
            });
        })
        .catch(() => {
          reject();
        });
    });
  },
};
