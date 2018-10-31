const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => 'Hello world!',
};

const app = express();
dotEnv.config();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:lFn5OvxQmohxo666@ds133642.mlab.com:33642/3750_dasi', { useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to the database');
  }).catch((err) => {
    console.log(`Could not connect to the database. Exiting now...${err}`);
    process.exit();
  });

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = app;
// app.listen(4000);
// console.log('Running a GraphQL API server at localhost:4000/graphql');
