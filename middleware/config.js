module.exports = function(config) {
  return function(handle) {
    handle('request', function(env, next) {
      env.config = config;
      next(env);
    });
  };
};
