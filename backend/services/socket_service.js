const { Server } = require("socket.io");
var Auction = require("./../models/auction");
var carService = require("./car_service");

var io;
var serverObj;

var addListnerToCarSocket = (socket) => {
  socket.on("bid enterred", (data) => {
    console.log("bid entered event trigereed from car socket");
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
            io.of("/car/" + data.carId).emit("price updated", data);
            io.to("auction_room_" + data.carId).emit("price updated", data);
          })
          .catch((error) => {
            console.log("car price updation failed" + JSON.stringify(error));
          });
      })
      .catch(() => {
        console.log("auction entry insertion failed");
      });
  });
};
module.exports = {
  createServer: (server) => {
    if (typeof io === "undefined") {
      io = require("socket.io")(server, {
        cors: {
          origin: "*",
        },
      });
      io.of("/").on("connection", (socket) => {
        console.log("io connected");
        carService
          .get()
          .then((cars) => {
            console.log(cars.length);
            cars.forEach((car) => {
              //socket.join("auction_room_" + car["_id"]);
              let carNamespace = io.of("/car/" + car["_id"]);
              carNamespace.on("connection", (socket) => {
                console.log(`connected to car namespace ${car["_id"]}`);
                addListnerToCarSocket(socket);
              });
            });
          })
          .catch(() => {});
        //addListner(socket);
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
