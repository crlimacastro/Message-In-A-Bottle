const mathUtils = require('../utils/mathUtils.js');
const MessageResponse = require('./jsonResponses/MessageResponse.js');
const pools = require('./data/msgPools.json');

let {
  mainPool, // Pool containing all messages
  topicPools, // Object containing all topic pools
} = pools;

// #region Helper functions

/** Helper function, returns how many messages are in a specified pool */
const poolCount = (pool) => Object.keys(pool).length;

/** Helper function, creates msg and adds it to all appropriate pools */
const createMsg = (message, topic = null) => {
  const t = topic ? topic.toLowerCase() : null; // Lowercase all topics
  const msgObj = new MessageResponse(message, t); // Create message object
  const { id } = msgObj; // Get the generated id
  mainPool[id] = msgObj; // Add it to public pool

  // If a topic was specified
  if (t) {
    // If a pool for topic exists
    if (topicPools[t]) {
      const topicPool = topicPools[t];
      topicPool[id] = msgObj; // Add it to the topic pool
    } else {
      const topicPool = {}; // Create a new topic pool for 't'
      topicPool[id] = msgObj; // Add msgObj to it
      topicPools[t] = topicPool; // Add topic pool to container
    }
  }
};

/**
 * Deletes message from all appropriate pools.
 * Returns the deleted message.
 * Returns null if nothing was deleted;
 * @param {String} id
 */
const deleteMsg = (id) => {
  const msgObj = mainPool[id];

  // If a message was found with that id
  if (msgObj) {
    const deletedMsg = mainPool[id]; // Save deleted msg
    delete mainPool[id]; // Delete msg at public pool

    // If the message has a topic
    if (msgObj.topic) {
      const { topic } = msgObj;

      // If there is a pool for that topic
      if (topicPools[topic]) {
        const topicPool = topicPools[topic];

        delete topicPool[id]; // Delete msg at topic pool as well
      }
    }

    // TODO: update file

    return deletedMsg;
  }

  return null;
};

const fetchRandMsg = (pool) => {
  // If pool has messages
  if (poolCount(pool)) {
    const i = Math.floor(Math.random() * poolCount(pool)); // Get random index
    const values = Object.values(pool); // Get array of values (msgs)
    const msgObj = values[i];
    const { id } = msgObj;
    deleteMsg(id); // Remove msg from pools
    msgObj.flagReceived(); // Flag as received
    return msgObj;
  }

  return null;
};

// #endregion

// #region Interfacing Functions

/** Returns how many messages are in the pool. */
const mainCount = () => poolCount(mainPool);

/**
 * Returns how many messages are in a certain topic pool.
 * Returns null if no pool is found with that topic.
 * @param {String} topic
 */
const topicCount = (topic) => {
  if (topic) {
    const t = topic.toLowerCase();
    const topicPool = topicPools[t];
    if (topicPool) {
      return poolCount(topicPool);
    }
  }

  return null;
};

/**
 * Returns a number of saved messages in main pool.
 * @param {Number} limit Amount to get back.
 * @param {Number} offset Index to start from. */
const peek = (limit = 1, offset = 0) => {
  let i = offset ? Number(offset) : 0; // cast offset to a number
  i = mathUtils.clamp(i, 0, mainCount() - 1); // clamp between 0 and count
  i = Math.floor(i); // make sure it is an integer

  let lim = limit ? Number(limit) : 1; // cast limit to a number
  lim = mathUtils.clamp(lim, 0, mainCount() - i); // clamp between 0 and last index remaining
  lim = Math.floor(lim); // make sure it is an integer

  const values = Object.values(mainPool); // Get array of msgs
  return values.slice(i, i + lim);
};

/** Returns a random message & removes it from the pool.
 *  Returns null if empty. */
const popRandom = (topic = null) => {
  // If there are messages in the main pool
  if (mainCount() > 0) {
    // If a topic was specified
    if (topic) {
      const t = topic.toLowerCase(); // Lowercase all topics

      // If the topic pool exists
      if (topicPools[t]) {
        const topicPool = topicPools[t];
        const msgObj = fetchRandMsg(topicPool);

        // If a message was found
        if (msgObj) {
          return msgObj;
        }
      }

      // If the topic didn't exist, return null
      return null;
    }

    // Topic was not specified
    const msgObj = fetchRandMsg(mainPool);

    // If a message was found
    if (msgObj) {
      return msgObj;
    }
  }

  // TODO: Update file

  return null;
};

/** Adds a message to the pool */
const push = (message, topic = null) => {
  createMsg(message, topic);

  // TODO: Update file
};

/** Clears all msgs from the pools */
const clear = () => {
  mainPool = {};
  topicPools = {};
};

// #endregion

module.exports = {
  mainCount,
  topicCount,
  peek,
  popRandom,
  deleteMsg,
  push,
  clear,
};
