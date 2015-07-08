var detroit2015 = require('./detroit2015');

module.exports = function(server) {
  server
    .get('/', require('./home'))
    .map('/detroit2015', detroit2015);
};
