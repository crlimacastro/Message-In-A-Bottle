const jokeRandomizer = require('./jokeRandomizer.js');

const formatJokeToXML = (json) => `
  <joke>
    <q>${json.q}</q>
    <a>${json.a}"</a>
  </joke>`;

const formatJokesToXML = (json) => {
  let text = '<jokes>';
  json.forEach((joke) => { text += formatJokeToXML(joke); });
  text += '</jokes>';

  return text;
};

const prependVersionXML = (xml) => `<?xml version="1.0" ?>${xml}`;

const getRandomJoke = () => {
  const xml = prependVersionXML(formatJokeToXML(jokeRandomizer.getRandomJoke()));
  return xml;
};

const getRandomJokes = (params) => {
  const xml = prependVersionXML(formatJokesToXML(jokeRandomizer.getRandomJokes(params.limit)));
  return xml;
};

module.exports.getRandomJoke = getRandomJoke;
module.exports.getRandomJokes = getRandomJokes;
