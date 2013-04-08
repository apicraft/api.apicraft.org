var guidelines = require('./guidelines_data');

module.exports = function(handle) {
  handle('request', function(env, next) {
    var g = guidelines;
    g.links = [
      { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
      { rel: 'index', href: env.helpers.uri('home') }
    ];

    env.response.statusCode = 200;
    env.response.body = g;
    
    next(env);
  });
};
