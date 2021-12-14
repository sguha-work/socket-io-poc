var User = require("../models/user");
module.exports = {
  //auctionService: {
  login: (data) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: data.email }, "userName", (err, data) => {
        if (err) {
          reject(err);
        } else {
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
        email: data.email,
        password: data.password,
      });
      user
        .save()
        .then((doc) => {
          resolve(true);
        })
        .catch((error) => {
          reject({ messege: "Error to register user" });
        });
    });
  },
};
