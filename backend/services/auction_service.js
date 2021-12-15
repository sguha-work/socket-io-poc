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
              var io = socketService.getio();
              console.log("price update event triggered");
              io.emit("price updated", data);

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
  getAuctionEntriesByCarName: (data) => {
    return new Promise((resolve, reject) => {
      Auction.find({ carId: data.carId }, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  },
};
