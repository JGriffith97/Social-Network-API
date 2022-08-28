const connection = require('../config/connection');
const { Thought, User, Reaction } = require('../models');
const { getRandomReactions, getRandomArrItem, genRandomIndex, usernames, emails, thoughts, reactions } = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Deletes if exists
  await Thought.deleteMany({});
  await User.deleteMany({});

  const userThoughts = [];
  const userReactions = getRandomReactions(2);

  for (let i = 0; i < 10; i++) {
    userThoughts.push({
      thoughtText: thoughts[i],
      username: usernames[i],
      reactions: userReactions,
    })
  }

  await Thought.collection.insertMany(userThoughts);

  const users = [];
  function makeUsers() {
    for (i = 0; i < userThoughts.length; i++) {
      users.push({
        username: usernames[i],
        email: emails[i],
        thoughts: [userThoughts[i]._id],
        // Applies the userThoughts to the users object by their id.
      });
    }
  }

  // Runs the makeUsers function, then inserts the users array to the User collection.
  makeUsers()
  await User.collection.insertMany(users);

  const getRandomFriends = (int) => {
    const friends = [];
    for (let i = 0; i < int; i++) {
      friends.push(
        getRandomArrItem(users)._id,
      );
    }
    return friends;
  };

  // Updates each user with friends pulled from existing users.
  for (i = 0; i < users.length; i++) {
    await User.collection.updateOne(
      { "friends": null },
      [{ $set: { friends: getRandomFriends(2) }}],
    );
  }

  console.table(users, ['username', 'email', 'thoughts', '_id']);
  console.table(userThoughts, ['thoughtText', 'username', 'reactions', '_id']);
  console.info('Seeded!');
  process.exit(0);
});