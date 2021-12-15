const { Server } = require("socket.io");
var Auction = require("./../models/auction");
var carService = require("./car_service");

var io, socketObj;
var serverObj;
var addListner = (socket) => {
  socket.on("bid enterred", (data) => {
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
            io.to("auction_room_" + data.carId).emit("price updated", data);
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
        carService.get().then((cars)=>{
          cars.forEach((car) => {
            socket.join("auction_room_" + car['_id']);
          });
        }).catch(()=>{
        });
        socketObj = socket;        
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
