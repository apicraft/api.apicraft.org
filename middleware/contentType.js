module.exports = function(addHandler) {
  addHandler('response', function(env, next) {
    if (!env.response.getHeader('Content-Type')) {
      env.response.setHeader('Content-Type', 'application/vnd.siren+json');
    }

    next(env);
  });
};
