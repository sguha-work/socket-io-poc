var Car = require("../models/car");
module.exports = {
  add: (data) => {
    return new Promise((resolve, reject) => {
      if (
        typeof data.carNumber == "undefined" ||
        typeof data.carName == "undefined" ||
        typeof data.carImage == "undefined" ||
        typeof data.basePrice == "undefined" ||
        typeof data.addedBy == "undefined"
      ) {
        reject({ messege: "Error to add car" });
      }
      try {
        let car = new Car({
          carNumber: data.carNumber,
          carImage: data.carImage,
          carName: data.carName,
          basePrice: data.basePrice,
          addedBy: data.addedBy,
          currentBid: data.basePrice,
          currentHighestBidder: "",
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
