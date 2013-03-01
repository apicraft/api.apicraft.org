module.exports = function(handle) {
  handle('response', function(env, next) {
    if (env.request.method === 'OPTIONS') {
      if (env.response.statusCode == 405) {
        env.response.statusCode = 200;
        env.response.body = null;
      }
      env.response.setHeader('Access-Control-Allow-Origin', '*');
      env.response.setHeader('Access-Control-Allow-Headers', 'accept, origin, authorization, content-type');
      env.response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      env.response.setHeader('Access-Control-Max-Age', '432000');
    } else {
      env.response.setHeader('Access-Control-Allow-Origin', '*');
    }

    next(env);
  });
};
