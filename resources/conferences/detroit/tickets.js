var helpers = require('../helpers');

module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
    var body = {
      links: [
        { rel: ['self'], href: helpers.uri(env.request.url) },
        { rel: ['index'], href: helpers.uri('home') }
      ]
    };
    env.response.body = JSON.stringify(body);
    next(env);
  });
};
