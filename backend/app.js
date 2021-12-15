var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { createServer } = require('http');

var indexRouter = require('./routes/index');
var auctionRouter = require('./routes/auction');


const { execute, subscribe } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./gqlschema/schema');

const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://clusterAdmin:cluster$Pwd@covidcluster-hvx2f.mongodb.net/gql?retryWrites=true&w=majority'); // Aritrik
mongoose.connect('mongodb+srv://angshu_mongo:HhWjjsZoi1wDqZkj@cluster0.1f9ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'); // s-guha

mongoose.connection.once('open', () => {
  console.log('conneted to database');
});


var app = express();





var PORT = 3001;
const subscriptionsEndpoint = `ws://localhost:${PORT}/subscriptions`;



//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use('/graphql', graphqlHTTP({
  //Directing express-graphql to use this schema to map out the graph 
  schema: schema,
  //Directing express-graphql to use graphiql when goto '/graphql' address in the browser
  //which provides an interface to make GraphQl queries
  graphiql: true,
  subscriptionsEndpoint: subscriptionsEndpoint
}));


const webServer = createServer(app);
const { SubscriptionServer } = require('subscriptions-transport-ws');
webServer.listen(PORT, () => {
  console.log(`GraphQL is now running on http://localhost:${PORT}`);
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: webServer,
      path: '/subscriptions',
    }
  );

})




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auction', auctionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
