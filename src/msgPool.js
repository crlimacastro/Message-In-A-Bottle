const msgsJSON = require('./msgs.json');
const mathUtils = require('./utils/mathUtils.js');
const Message = require('./Message.js');

const { msgPool } = msgsJSON;

/**
 * Returns a number of saved messages in msgs file.
 * @param {Number} limit Number of messages to get back.
 * @param {Number} offset Index to start from. */
const peek = (limit = 1, offset = 0) => {
  let lim = Number(limit); // cast limit to a number
  lim = mathUtils.clamp(lim, 0, msgPool.length); // clamp between 0 and the length of the array
  lim = Math.floor(lim); // make sure it is an integer

  let i = Number(offset); // cast offset to a number
  i = mathUtils.clamp(i, 0, msgPool.length - lim); // clamp between 0 until last index remaining
  i = Math.floor(i); // make sure it is an integer

  return msgPool.slice(i, i + lim);
};

/** Returns a random message & removes it from the pool.
 *  Returns null if empty. */
const popRandom = () => {
  if (msgPool.length > 0) {
    // Get random message
    const i = Math.floor(Math.random() * msgPool.length);
    const msg = msgPool[i];

    msgPool.splice(i, 1); // Remove msg from array
    // TODO: Update msgs file

    msg.flagReceived(); // Flag as received
    return msg;
  }

  return null;
};

/** Adds a message to the pool */
const push = (text) => {
  const msg = new Message(text);
  msgPool.push(msg);
  // TODO: Update msgs file
};

/** Returns how many messages are in the pool. */
const length = () => msgPool.length();

module.exports = {
  peek,
  popRandom,
  push,
  length,
};
