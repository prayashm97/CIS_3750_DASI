/* eslint-disable no-console */

const express = require('express');
const graphqlHTTP = require('express-graphql');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

const schema = require('./schema');


// Construct a schema, using GraphQL schema language


// // The root provides a resolver function for each API endpoint
// const root = {
//   quoteOfTheDay: () => (Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'),
//   random: () => Math.random(),
//   rollThreeDice: () => [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6)),
//   hello: () => 'hello world',
// };

const app = express();
dotEnv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to the database');
  }).catch((err) => {
    console.log(`Could not connect to the database. Exiting now...${err}`);
    process.exit();
  });

app.use('/graphql', graphqlHTTP({
  schema,
  // rootValue: root,
  graphiql: true,
}));

module.exports = app;
// app.listen(4000);
// console.log('Running a GraphQL API server at localhost:4000/graphql');
