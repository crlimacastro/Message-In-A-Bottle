// const underscore = require('underscore'); // Contains extra array functions
const msgs = require('./msgs.json');

const { msgPool } = msgs; // Array of saved messages

/**
 * Returns a random message from the msgs file.
 * Removes it from the pool
 */
const getRandomMsg = () => {
  if (msgPool.length !== 0) {
    const i = Math.floor(Math.random() * msgPool.length);
    const msg = msgPool[i];
    msgPool.splice(i, 1); // Remove msg from array
    return msg;
  }

  return null;
};
// const clamp = (num, min, max) => Math.max(Math.min(num, max), min);

// /**
//  * Returns array of messages
//  * @param {Number} limit Number of mess to get back */
// const getRandomMsgs = (limit = 1) => {
//   let lim = Number(limit); // cast limit to a number
//   lim = !lim ? 1 : lim; // set default value to 1
//   lim = Math.floor(lim); // make sure it is an integer
//   lim = clamp(lim, 1, jokes.length); // constrain it between 1 and the length of the jokes array

//   const shuffledJokes = underscore.shuffle(jokes); // get shuffled jokes array
//   return shuffledJokes.slice(0, lim);
// };

module.exports = {
  getRandomMsg,
};
