module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
    env.response.statusCode = 204;
    next(env);
  });
};
