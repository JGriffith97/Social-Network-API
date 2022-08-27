const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friends').post(addFriend);

router.route('/:userId/friends/:friendId').delete(removeFriend);

// Per the readme, friends and friendsId routes are required after the userId route.
// Gonna try and do that in it's own controller file.

module.exports = router;