const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
var https = require("https");
const mongoose = require('mongoose');
const fs = require("fs");
const app = express();
const cors = require("cors");
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    // origin:'http://localhost:4200'
  })
);
app.use('/api', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));
console.log('connection to ' + `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1f9ag.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`);
const createAndStartListingToServer = (() => {
  const server = https.createServer({
    key: fs.readFileSync("./localhost3005.key"), // path to localhost+2-key.pem
    cert: fs.readFileSync("./localhost3005.cert"), // path to localhost+2.pem
    requestCert: false,
    rejectUnauthorized: false,
  }, app)
    .listen(3005, function () {
      console.log("Successfully started server on port 3005");
    });
  SubscriptionServer.create({ graphqlSchema, graphqlResolvers, execute, subscribe }, {
    server: server,
    path:'/api' // Listens for 'upgrade' websocket events on the raw server
  })
});
mongoose.connect(
  `mongodb+srv://angshu_mongo:HhWjjsZoi1wDqZkj@cluster0.1f9ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
).then(() => {
  console.log('Database connection established');
  createAndStartListingToServer();
}).catch((error) => {
  console.error('Unable to connect to database ', error);
});


/**
 * Example mutation
 * 
 mutation {
  createCar(carinput:{
    carNumber:"WB24AK4532", 
    carImage:"asfasffasf",
    carName:"RE", 
    basePrice: 100, 
    currentBid: 100, 
    currentHighestBidder:"sguha1988.life@gmail.com",
    addedBy: "sguha1988.life@gmail.com"
  }) {
    carName
    carImage
    carNumber
    basePrice
    currentBid
    addedBy
    currentHighestBidder
  }
}
 */

/**
 * Example query
 query {
  cars {
    currentHighestBidder
  }
}
 */