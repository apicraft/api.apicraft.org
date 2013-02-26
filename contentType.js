module.exports = function(addHandler) {
  addHandler('response', function(env, next) {
    env.response.setHeader('Content-Type', 'application/vnd.siren+json');
    next(env);
  });
};
