module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
    var body = {
      links: [
        { rel: 'self', href: env.helpers.uri(env.request.url) },
        { rel: ['index'], href: env.helpers.uri('home') }
      ]
    };
    env.response.body = body;
    next(env);
  });
};
