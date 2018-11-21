/* eslint-disable no-underscore-dangle */
const { User, Screen } = require('./model');

const resolvers = {
  Query: {
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
      input,
    }) {
      try {
        await Screen.deleteOne(input);
        return true;
      } catch (e) {
        return false;
      }
    },

    async updateScreen(root, {
      input,
    }) {
      try {
        return await Screen.findOneAndUpdate({ _id: input._id }, {
          $set:
        { name: input.name, timing: input.timing, slides: input.slides },
        }, { new: true }, (err) => {
          if (err) {
            throw err;
          }
        });
      } catch (err) {
        return err;
      }
    },

  },
};

module.exports = resolvers;
