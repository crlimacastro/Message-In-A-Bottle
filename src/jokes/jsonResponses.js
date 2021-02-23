const jokeRandomizer = require('./jokeRandomizer.js');

const getRandomJoke = () => JSON.stringify(jokeRandomizer.getRandomJoke());
const getRandomJokes = (params) => JSON.stringify(jokeRandomizer.getRandomJokes(params.limit));

module.exports.getRandomJoke = getRandomJoke;
module.exports.getRandomJokes = getRandomJokes;
