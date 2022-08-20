const { Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought under that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.paramas.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought under that ID' })
          : res.json({ message: 'Thought Deleted!' })
      )
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((thought) => 
      !thought
        ? res.status(404).json({ message: 'No thought under that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    // Post to :thoughtId/reactions
    console.log('Adding reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .then((thought) => 
      !thought
        ? res
          .status(404)
          .json({ message: 'No thought found under that ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    // Delete via :thoughtId/:reactionId
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: req.params.reactionId }} },
      { runValidators: true, new: true }
    )
    .then((thought) =>
      !thought
        ?res
          .status(404)
          .json({ message: 'No thought found under that ID' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
};