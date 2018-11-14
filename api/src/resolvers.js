const { User, Screen } = require('./model');

const resolvers = {
  Query: {
    allScreensByUser(root, { user }) {
      return Screen.find({ doneBy: user });
    },
    allScreens() {
      return Screen.find({});
    },
  },
  Mutation: {
    async createScreen(root, {
      input,
    }) {
      try {
        return await Screen.create(input);
      } catch (error) {
        return error;
      }
    },

    async createUser(root, {
      input,
    }) {
      try {
        return await User.create(input);
      } catch (error) {
        return error;
      }
    },

  },
};

module.exports = resolvers;
