const msgFetcher = require('../msgFetcher.js');

const getRandomMsg = () => {
  const msg = msgFetcher.getRandomMsg();
  if (msg) {
    return JSON.stringify(msg);
  }

  return null;
};
// const getRandomJokes = (params) => JSON.stringify(jokeRandomizer.getRandomJokes(params.limit));

module.exports = {
  getRandomMsg,
};
