var config = require('./config');

module.exports = function(addHandler) {
  addHandler('response', function(env, next) {
    var body;
    var errors = {
      404: 'Not Found',
      500: 'Internal Server Error',
      405: 'Method Not Allowed'
    };

    if (errors[env.response.statusCode]) {
      var body = {
        properties: {
          error: errors[env.response.statusCode]
        },
        links: [
          { rel: ['self'], href: config.baseUri + env.request.url }
        ]
      };
      env.responseBody = JSON.stringify(body);
    }

    next(env);
  });
};

