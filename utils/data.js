const usernames = [
  'RandomUser1',
  'RandomUser2',
  'RandomUser3',
  'RandomUser4',
  'RandomUser5',
  'RandomUser6',
  'RandomUser7',
  'RandomUser8',
  'RandomUser9',
  'RandomUser10',
];

const emails = [
  'RandomUser1@email.com',
  'RandomUser2@email.com',
  'RandomUser3@email.com',
  'RandomUser4@email.com',
  'RandomUser5@email.com',
  'RandomUser6@email.com',
  'RandomUser7@email.com',
  'RandomUser8@email.com',
  'RandomUser9@email.com',
  'RandomUser10@email.com',
]

const thoughts = [
  'This is a first random thought.',
  'This is a second random thought.',
  'This is a third random thought.',
  'This is a fourth random thought.',
  'This is a fifth random thought.',
  'This is a sixth random thought.',
  'This is a seventh random thought.',
  'This is a eighth random thought.',
  'This is a ninth random thought.',
  'This is a tenth random thought.',
]

const reactions = [
  'This is a first random reaction.',
  'This is a second random reaction.',
  'This is a third random reaction.',
  'This is a fourth random reaction.',
  'This is a fifth random reaction.',
  'This is a sixth random reaction.',
  'This is a seventh random reaction.',
  'This is a eighth random reaction.',
  'This is a ninth random reaction.',
  'This is a tenth random reaction.',
]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactions: getRandomArrItem(reactions),
    });
  }
  return results;
};

// const getUsers = (int) => {
//   let userResults = [];
//   for (let i = 0; i < int; i++) {
//     userResults.push({
//       username: usernames[i],
//       email: emails[i],
//       thoughts: [thoughts[genRandomIndex(thoughts)]._id],
//       friends: [...getFriends(1)],
//     });
//   }
//   return userResults;
// };

// const thoughtResults = []

// const getThoughts = (int) => {
//   for (let i = 0; i < int; i++) {
//     thoughtResults.push({
//       thoughtText: getRandomArrItem(thoughts),
//       username: getRandomArrItem(usernames),
//       reactions: [...getReactions(1)],
//     });
//   }
//   return thoughtResults;
// };

// const getReactions = (int) => {
//   let reactionResults = [];
//   for (let i = 0; i < int; i++) {
//     reactionResults.push({
//       reactionBody: getRandomArrItem(reactions),
//       username: getRandomArrItem(usernames),
//     });
//   }
//   return reactionResults;
// };

// const getFriends = (int) => {
//   let friendResults = [];
//   for (let i = 0; i < int; i++) {
//     friendResults.push({
//       username: getRandomArrItem(usernames),
//       email: getRandomArrItem(emails),
//     });
//   }
//   return friendResults;
// }; 


module.exports = { getRandomReactions, getRandomArrItem, genRandomIndex, usernames, emails, thoughts, reactions };