const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
      // Validate would work too, but would require a function to be passed in.
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // friends is a self-reference.
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual called friendCount
// userSchema
//   .virtual('friendCount')
//   .get(function () {
//     console.log(this.friends)
//     return this.friends.length;
//   });

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema)


module.exports = User;

