module.exports = function(handle) {
  handle('request', function(env, next) {
    env.response.statusCode = 200;
    env.response.body = {
      links: [ { rel: env.helpers.rel('conference'), href: env.helpers.uri('/conferences/detroit') } ]
    };

    next(env);
  });
};

