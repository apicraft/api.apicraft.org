var config = require('./config');

module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
    var body = {
      links: [
        { rel: ['self'], href: config.baseUri + env.request.url }
      ]
    };
    env.responseBody = JSON.stringify(body);
    next(env);
  });
};
