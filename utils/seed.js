const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getUsers, getThoughts } = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Deletes if exists
  await Thought.deleteMany({});
  await User.deleteMany({});
})