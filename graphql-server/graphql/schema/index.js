const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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
        type Subscription {
            bidEntered: Result
        }
        type Result {
            carNumber: String!
            currentBid: Int!
        }
        schema {
            query: RootQuery
            mutation: RootMutation
            subscription: Subscription
        }
    `);