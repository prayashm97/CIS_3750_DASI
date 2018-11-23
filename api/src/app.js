/* eslint-disable no-console */

const express = require('express');
const graphqlHTTP = require('express-graphql');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// where our graphql schema is living right now
const schema = require('./schema');

const app = express();
dotEnv.config();
app.use(cors());

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
