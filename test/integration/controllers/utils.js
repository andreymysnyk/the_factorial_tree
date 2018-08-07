module.exports.assert = function (desc, a, b) {
  if (a !== b) {
    throw new Error(desc + ' - Expected: ' + a + ' Actual: ' + b);
  }
};
