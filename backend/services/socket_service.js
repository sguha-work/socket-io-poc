const { Server } = require("socket.io");
var io, socketObj;
var serverObj;
var addListner = (socket) => {
  // price update event listner
  //socket.on(priceUpdateEventName, (data) => {
  //console.log('price updated '+JSON.stringify(data));
  //io.emit(priceUpdateEventName, data);
  //});
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
      io.on("connect", (socket) => {
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
