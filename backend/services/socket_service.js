const { Server } = require("socket.io");
var io;
module.exports = {
  createServer: (server) => {
    io = new Server(server,{cors: {
        origin: '*',
      }});
    return io;
  },
  getio: ()=>{
      if(typeof io === 'undefined') {
        console.error('Call create server first');
      } else {
        return io;
      }
  }
};
