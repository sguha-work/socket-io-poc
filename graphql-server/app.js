const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const app = express();

const Car = require('./models/car');

app.use(bodyParser.json());

app.use('/api', graphqlHTTP({
    schema: buildSchema(`
        type Car {
            _id: ID!
            carNumber: String!
            carImage: String!
            carName: String!
            basePrice: Int!
            addedBy: String!
            currentBid: Int!
            currentHighestBidder: String!
        }
        input CarInput {
            carNumber: String!
            carImage: String!
            carName: String!
            basePrice: Int!
            addedBy: String!
            currentBid: Int!
            currentHighestBidder: String!
        }
        type RootQuery {
            cars: [Car!]!
        }
        type RootMutation {
            createCar(carinput: CarInput): Car
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        cars: async (args) => {
            let result = await Car.find();
            return result.map((dataChunk) => {
                return { ...dataChunk._doc };
            });
        },
        createCar: async (args) => {
            // let car = {
            //     _id: Math.random().toString(),
            //     carNumber: args.carinput.carNumber,
            //     carImage: args.carinput.carImage,
            //     carName: args.carinput.carName,
            //     basePrice: args.carinput.basePrice,
            //     addedBy: args.carinput.addedBy,
            //     currentBid: args.carinput.currentBid,
            //     currentHighestBidder: args.carinput.currentHighestBidder
            // }
            let car = new Car({
                carNumber: args.carinput.carNumber,
                carImage: args.carinput.carImage,
                carName: args.carinput.carName,
                basePrice: args.carinput.basePrice,
                addedBy: args.carinput.addedBy,
                currentBid: args.carinput.currentBid,
                currentHighestBidder: args.carinput.currentHighestBidder
            });
            let result;
            try {
                result = await car.save();
            } catch (error) {
                console.error('Unable to save car info', error);
            }
            return { ...result._doc };
        }
    },
    graphiql: true
}));
console.log('connection to ' + `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1f9ag.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`);
mongoose.connect(
    `mongodb+srv://angshu_mongo:HhWjjsZoi1wDqZkj@cluster0.1f9ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
).then(() => {
    console.log('Database connection established');
    app.listen(3005, () => {
        console.log(`Server running on PORT 3005`);
    });
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