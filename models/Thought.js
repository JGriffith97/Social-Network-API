const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema], 
    // reactionSchema._id ?
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Virtual called reactionCount that retrieves the length of the thought's
// reactions array field on query.

// Need a getter method to format the timestamp on query

const Thought = model('thought', thoughtSchema);

module.exports = Thought;