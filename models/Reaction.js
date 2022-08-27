const { Schema, Types } = require('mongoose');

// const opts = {
//   createdAt: { currentTime: () => Date.now().toLocaleString() }
// }

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
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
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
); 

function cleanDate(createdAt) {
  let newDate = new Date(createdAt)
  return newDate.toLocaleString();
};
  

module.exports = reactionSchema;