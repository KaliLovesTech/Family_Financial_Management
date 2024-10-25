const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve('buffer/'),
    },
  },
  // Add any additional configurations, like entry/output, here if necessary
};
