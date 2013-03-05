var helpers = require('./helpers');

module.exports = function(handle) {
  handle('request', function(env, next) {
    env.response.statusCode = 200;
    env.response.body = {
      links: [ { rel: helpers.rel('conference'), href: helpers.uri('/conferences/detroit') } ]
    };

    next(env);
  });
};

