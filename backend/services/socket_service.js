const { Server } = require("socket.io");
var Auction = require("./../models/auction");
var carService = require("./car_service");

var io, socketObj;
var serverObj;
var addListner = (socket) => {
  // price update event listner
  //socket.on(priceUpdateEventName, (data) => {
  //console.log('price updated '+JSON.stringify(data));
  //io.emit(priceUpdateEventName, data);
  //});
  socket.on("bid enterred", (data) => {
    console.log('got a bid'+JSON.stringify(data)); 
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
            console.log("price updated event triggered");
            io.emit("price updated", data);
          })
          .catch((error) => {
            console.log('car price updation failed'+JSON.stringify(error));
          });
      })
      .catch(() => {
        console.log('auction entry insertion failed');
      });
  });
};
module.exports = {
  createServer: (server) => {
    if (typeof serverObj === "undefined") {
      serverObj = server;
    }
    if (typeof io === "undefined") {
      io = new Server(server, {
        cors: {
          origin: "*",
        },
      });
      io.on("connection", (socket) => {
        socketObj = socket;
        console.log("socket on ");
        addListner(socket);
      });
    }
    return io;
  },
  getSocketObj: () => {
    if (typeof socketObj === "undefined") {
      console.error("Call create server first");
    } else {
      return socketObj;
    }
  },
  getio: () => {
    if (typeof io === "undefined") {
      console.error("Call create server first");
    } else {
      return io;
    }
  },
};
