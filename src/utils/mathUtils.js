/** Clamps a number between two values */
const clamp = (num, min, max) => Math.max(Math.min(num, max), min);

module.exports = {
  clamp,
};
