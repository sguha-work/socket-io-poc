const express = require('express');
const https = require('https');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const {makeExecutableSchema} = require('@graphql-tools/schema');

mongoose.connect(`mongodb+srv://angshu_mongo:HhWjjsZoi1wDqZkj@cluster0.1f9ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Database connection established');
}).catch((error) => {
    console.error('Unable to connect to database ', error);
});


const typeDefs = require('./typedefs/typedefs');
const resolvers = require('./resolvers/resolvers');
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
const startServer = async () => {
    const app = express();
    const httpsServer = https.createServer({
        key: fs.readFileSync('localhost3005.key'),
        cert: fs.readFileSync('localhost3005.cert')
    }, app).listen(3005, () => {
        console.log(`Server listning to port 3005`);
    });
    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe
    }, {
        server: httpsServer,
        path: '/api'
    });
    const apolloServer = new ApolloServer({
        typeDefs, resolvers,
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                }
            }
        }]
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app, path: "/api" });
};
startServer();