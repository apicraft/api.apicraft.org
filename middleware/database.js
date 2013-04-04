var nano = require('nano');

module.exports = function(handle) {
  handle('request', function(env, next) {
    env.db = nano(env.config.dbUri);
    next(env);
  });
};
