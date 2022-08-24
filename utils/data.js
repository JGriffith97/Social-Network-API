const userNames = [
  'Random000',
  'Random111',
  'Random222',
  'Random333',
  'Random444',
];

const emails = [
  'Random000@email.com',
  'Random111@email.com',
  'Random222@email.com',
  'Random333@email.com',
  'Random444@email.com',
];

const thoughts = [
  'Random thought 1.',
  'Random thought 2.',
  'Random thought 3.',
  'Random thought 4.',
  'Random thought 5.',
];

const getUsers = () => {
  let users = [];
  for (let i = 0; i < userNames.length; i++) {
    users.push({
      username: userNames[i],
      email: emails[i],
    });
  }
  return users;
};

const getThoughts = () => {
  let newThoughts = [];
  for (let i = 0; i < thoughts.length; i++) {
    newThoughts.push({
      thoughtText: thoughts[i]
    });
  }
  return newThoughts;
}

module.exports = { getUsers, getThoughts }