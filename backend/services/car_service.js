var Car = require("../models/car");
module.exports = {
  add: (data) => {
    return new Promise((resolve, reject) => {
      if(typeof data.carNumber=='undefined'|| typeof data.carModelName == 'undefined' || typeof data.carImage == 'undefined' || typeof data.carBasePrice == 'undefined' ) {
        reject({ messege: "Error to add car" });
      }
      try {
        let car = new Car({
          carNumber: data.carNumber,
          carModelName: data.carModelName,
          carImage: data.carImage,
          carBasePrice: data.carBasePrice,
          currentBidPrice: data.carBasePrice
        });
        car
          .save()
          .then((doc) => {
            resolve(true);
          })
          .catch((error) => {
            console.log(JSON.stringify(error));
            reject({ messege: "Error to add car" });
          });
      } catch (e) {
        reject({ messege: "Error to add car" });
      }
    });
  },
};
