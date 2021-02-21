const underscore = require('underscore');
const jokes = require('./jokes.json');

const getRandomJoke = () => jokes[Math.floor(Math.random() * jokes.length)];

const clamp = (num, min, max) => Math.max(Math.min(num, max), min);

// Returns array of jokes
// limit: number of jokes to get back
const getRandomJokes = (limit = 1) => {
  let lim = Number(limit); // cast limit to a number
  lim = !lim ? 1 : lim; // set default value to 1
  lim = Math.floor(lim); // make sure it is an integer
  lim = clamp(lim, 1, jokes.length); // constrain it between 1 and the length of the jokes array

  const shuffledJokes = underscore.shuffle(jokes); // get shuffled jokes array
  return shuffledJokes.slice(0, lim);
};

module.exports.getRandomJoke = getRandomJoke;
module.exports.getRandomJokes = getRandomJokes;
