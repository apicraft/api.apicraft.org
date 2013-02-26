var config = require('./config');

exports.uri = function(resource) {
  if (resource === 'home' || !resource) {
    resource = '/';
  } else if (resource[0] !== '/') {
    resource = '/' + resource;
  }

  return config.baseHrefUri + resource;
};

exports.rel = function(val) {
  if (!val) {
    val = '/';
  }

  if (val[0] !== '/') {
    val = '/' + val;
  }

  return config.baseRelUri + val;
};
