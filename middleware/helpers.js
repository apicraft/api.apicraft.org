module.exports = function(handle) {
 handle('request', function(env, next) {
   env.helpers = getHelpers(env.config);
   next(env);
 });
};

var getHelpers = function(config) {
  return {
    uri: function(resource) {
      if (resource === 'home' || !resource) {
        resource = '/';
      } else if (resource[0] !== '/') {
        resource = '/' + resource;
      }

      return config.baseHrefUri + resource;
    },
    rel: function(val) {
      if (!val) {
        val = '/';
      }

      if (val[0] !== '/') {
        val = '/' + val;
      }

      return config.baseRelUri + val;
    }
  };
};
