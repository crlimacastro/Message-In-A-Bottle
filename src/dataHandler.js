const savedData = require('./savedData.json');
const mathUtils = require('./utils/mathUtils.js');
const MessageResponse = require('./responses/api/MessageResponse.js');

const {
  msgPool, // Public pool with all messages
  topics, // Object containing all topic pools
  users, // Object containing users by IP address and their saved messages
} = savedData;

// #region Helper functions

/** Helper function, returns how many messages are in a specified pool */
const poolCount = (pool) => Object.keys(pool).length;

const createMsg = (message, topic = null) => {
  const t = topic ? topic.toLowerCase() : null; // Lowercase all topics
  const msgObj = new MessageResponse(message, t); // Create message object
  const { id } = msgObj; // Get the generated id
  msgPool[id] = msgObj; // Add it to public pool

  // If a topic was specified
  if (t) {
    // If topic pool for 't' exists
    if (topics[t]) {
      const topicPool = topics[t];
      topicPool[id] = msgObj; // Add it to the topic pool
    } else {
      const topicPool = {}; // Create a new topic pool for 't'
      topicPool[id] = msgObj; // Add msgObj to it
      topics[t] = topicPool; // Add topic pool to topics
    }
  }
};

const deleteMsg = (id) => {
  const msgObj = msgPool[id];

  // If a message was found with that id
  if (msgObj) {
    delete msgPool[id]; // Delete msg at public pool

    // If the message has a topic
    if (msgObj.topic) {
      const { topic } = msgObj;

      // If topics has that topic
      if (topics[topic]) {
        const topicPool = topics[topic];

        delete topicPool[id]; // Delete msg at topic pool as well
      } else {
        throw new Error('Topic not found');
      }
    }
  } else {
    throw new Error(`Message with id ${id} not found`);
  }
};

const fetchRandMsg = (pool) => {
  const i = Math.floor(Math.random() * poolCount(pool)); // Get random index
  const values = Object.values(pool); // Get array of values (msgs)
  const msgObj = values[i];

  if (msgObj) {
    const { id } = msgObj;
    deleteMsg(id); // Remove msg from pools
    msgObj.flagReceived(); // Flag as received
    return msgObj;
  }

  return null;
};

const saveMsg = (msgObj, userIP) => {
  const user = users[userIP];
  const { id } = msgObj;

  // If user was found
  if (user) {
    user[id] = msgObj;
  } else {
    users[userIP] = {}; // Create user
    const newUser = users[userIP];
    newUser[id] = msgObj; // Save msg in user storage
  }
};

// #endregion

// #region Interfacing Functions

/** Returns how many messages are in the pool. */
const count = () => poolCount(msgPool);

/**
 * Returns a number of saved messages in msgs file.
 * @param {Number} limit Number of messages to get back.
 * @param {Number} offset Index to start from. */
const peek = (limit = 1, offset = 0) => {
  let i = Number(offset); // cast offset to a number
  i = mathUtils.clamp(i, 0, count() - 1); // clamp between 0 and count
  i = Math.floor(i); // make sure it is an integer

  let lim = Number(limit); // cast limit to a number
  lim = mathUtils.clamp(lim, 0, count() - i); // clamp between 0 and last index remaining
  lim = Math.floor(lim); // make sure it is an integer

  const values = Object.values(msgPool); // Get the jokes themselves
  return values.slice(i, i + lim);
};

/** Returns a random message & removes it from the pool.
 *  Returns null if empty. */
const popRandom = (userIP, topic = null) => {
  // If there are messages in the pool
  if (count() > 0) {
    // If a topic was specified
    if (topic) {
      const t = topic.toLowerCase();

      // If the topic exists
      if (topics[t]) {
        const topicPool = topics[t];
        const msgObj = fetchRandMsg(topicPool);
        if (msgObj) {
          saveMsg(msgObj, userIP);
        }
        return msgObj;
      }

      // If the topic didn't exist, return null
      return null;
    }

    // Topic was not specified
    const msgObj = fetchRandMsg(msgPool);
    if (msgObj) {
      saveMsg(msgObj, userIP);
    }
    return msgObj;
  }

  // TODO: Update msgs file

  return null;
};

/** Adds a message to the pool */
const push = (message, topic = null) => {
  createMsg(message, topic);

  // TODO: Update msgs file
};

// #endregion

module.exports = {
  peek,
  popRandom,
  push,
  count,
};
