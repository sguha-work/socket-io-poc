var User = require("../models/user");
module.exports = {
  //auctionService: {
  login: (data) => {
    return new Promise((resolve, reject) => {
      //let user = new User({});
      User.findOne({ userName: data.userName }, "userName", (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(data);
          if (data == null) {
            reject();
          } else {
            resolve(data);
          }
        }
      });
    });
  },
  register: (data) => {
    return new Promise((resolve, reject) => {
      let user = new User({
        userName: data.userName,
        userPassword: data.userPassword,
      });
      user
        .save()
        .then((doc) => {
          resolve(true);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          reject({ messege: "Error to register user" });
        });
    });
  },
};
