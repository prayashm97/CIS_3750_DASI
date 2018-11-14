const mongoose = require('mongoose');

const ScreenSchema = new mongoose.Schema({
  name: String,
  doneBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slides: [mongoose.Schema.Types.Mixed],
});

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
});

// UserSchema.virtual('id').get(() => this.toJSON()._id);
const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

module.exports = {
  Screen: mongoose.model('Screen', ScreenSchema),
  User: mongoose.model('User', UserSchema),
};
