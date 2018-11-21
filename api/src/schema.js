const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers');

const typeDefs = `
  type User {
    _id: ID!
    username: String
    email: String
  }

  type Screen {
    _id: ID!
    name: String
    doneBy: User
    slides: [String]
    timing: Int
  }

  input ScreenInput {
    name: String!
    slides: [String]
    doneBy: ID!
    timing: Int
  }

  input ScreenDetailsForUpdate {
    name: String
    slides: [String]
    timing: Int
  }

  input UserInput {
    username: String!
    email: String!
  }

  type Mutation {
    createScreen(input: ScreenInput) : Screen
    createUser(input: UserInput) : User
    removeScreen(_id: ID!) : Screen
    updateScreen(_id: ID!, input: ScreenDetailsForUpdate): Screen    
  }

  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    hello: String
    allScreensByUser(user: String!): [Screen]
    allScreens: [Screen]
    getScreen(_id: ID!): Screen
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
module.exports = schema;
