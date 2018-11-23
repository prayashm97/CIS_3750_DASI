/* eslint-disable no-underscore-dangle */
const { User, Screen } = require('./model');

const resolvers = {
  Query: {
    async getScreen(root, {
      _id,
    }) {
      try {
        return await Screen.findById(_id);
      } catch (error) {
        return error;
      }
    },
    allScreensByUser(root, { user }) {
      return Screen.find({ doneBy: user });
    },
    allScreens() {
      return Screen.find({});
    },
    quoteOfTheDay() {
      return (Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within');
    },
    random() {
      return Math.random();
    },
    rollThreeDice() {
      return [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6));
    },
    hello() {
      return 'hello world';
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

    async removeScreen(root, {
      _id,
    }) {
      try {
        return await Screen.findOneAndRemove({ _id });
      } catch (e) {
        return e;
      }
    },

    async updateScreen(root, {
      _id,
      input,
    }) {
      try {
        return await Screen.findOneAndUpdate({
          _id,
        }, input, {
          new: true,
        });
      } catch (err) {
        return err;
      }
    },

  },
};

module.exports = resolvers;
