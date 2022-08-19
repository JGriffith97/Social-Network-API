const { Schema, Types } = require('mongoose');

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
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
); 

// Need a getter method to format the timestamp on query.
reactionSchema
  .get(function () {
    return this.createdAt.toLocaleString();
  })

  // This is a note from a prior SQL project,
  // just in case the above doesn't work.
  // module.exports = {
  //   format_date: (date) => {
  //     let newDate = new Date(date)
  //     // Format date as MM/DD/YYYY
  //     return newDate.toLocaleDateString();
  //   },
  // };

module.exports = reactionSchema;