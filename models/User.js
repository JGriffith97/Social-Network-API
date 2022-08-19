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
      validator: { $jsonSchema: {
        bsonType: "object",
        title: "Email Validation",
        properties: {
          email: {
            "bsonType": "string",
            "pattern": "", // This will be a regex
            "description": "Field must be a valid email address!"
          },
        },
      }},
      // !! Look into email matching validation. !!
      // Not 100% sure this will work.
      // https://www.mongodb.com/docs/manual/core/schema-validation/#use-title-and-description-fields-to-clarify-validation-rules
      validationLevel: "moderate"
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
        // friends is a self-reference.
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual called friendCount
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema)

module.exports = User;

