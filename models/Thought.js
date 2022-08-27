const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');

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
      default: Date.now(),
      get: cleanDate
    },
    reactions: [reactionSchema], 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual called reactionCount that retrieves the length of the thought's
// reactions array field on query.
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// Not sure if these two can be in one group.

// Need a getter method to format the timestamp on query
function cleanDate(createdAt) {
  let newDate = new Date(createdAt)
  return newDate.toLocaleString();
};

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;