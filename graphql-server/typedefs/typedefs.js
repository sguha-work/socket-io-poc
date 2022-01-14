const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type Car {
        id: ID
        carNumber:String
        carImage: String
        carName: String
        basePrice: Int
        addedBy: String
        currentBid: Int
        currentHighestBidder: String
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
    type Query {
        getCars: [Car]
    }
    type Mutation {
        createCar(car: CarInput): Car
        updateBidPrice(id: String, currentBid: Int): Car
    }
    type Subscription {
        bidEntered: Car
    }
`;
module.exports = typeDefs;