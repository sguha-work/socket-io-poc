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
            io.of("/car/" + data.carId).emit("price updated", data);
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
    if (typeof serverObj === "undefined") {
      serverObj = server;
    }
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
            cars.forEach((car) => {
              socket.join("auction_room_" + car["_id"]);
              let carNamespace = io.of("/car/" + car["_id"]);
              carNamespace.on("connection", (socket) => {
                console.log(`connected to car namespace`);
                addListnerToCarSocket(socket);
              });
            });
          })
          .catch(() => {});
        socketObj = socket;
        addListner(socket);
      });
      // var carNamespace = io.of("/car");
      // console.log('creating car namespace');
      // carNamespace.on("connection", (socket) => {
      //   console.log(`connected to car namespace`);
      //   addListnerToCarSocket(socket);
      // });
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
