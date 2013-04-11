var transit = require('./data/transit');

module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
    transit.links = [
      { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
      { rel: 'index', href: env.helpers.uri('/conferences/') + env.config.location }
    ];
    env.response.statusCode = 200;
    env.response.body = transit;
    next(env);
  });
};