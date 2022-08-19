const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Look into email matching validation.
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
    // friends is a self-reference.
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual called friendCount

const User = model('user', userSchema)

module.exports = User;

