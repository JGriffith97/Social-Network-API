const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        res.status(500).json(err); 
        console.log(err);
      });
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user under that ID' })
          : res.json(user)
      )
      .catch((err) => { 
        res.status(500).json(err);
        console.log(err);
      });
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user under that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user under that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    // Post to :userId/friends or via the id?
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId } },
      { runValidators: true, new: true } // New returns the document after the update was applied.
                                         // Default is false.
    )
    .then((user) => 
      !user
        ? res
            .status(404)
            .json({ message: `No user found under that ID` })
        : res.json(user)
    )
        .catch((err) => res.status(500).json(err))

  },
  removeFriend(req, res) {
    // Delete via :userId/friends/:friendId
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    .then((user) =>
      !user
        ? res
          .status(404)
          .json({ message: 'No user found under that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
};