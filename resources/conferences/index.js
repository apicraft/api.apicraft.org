var detroit2013 = require('./detroit2013');

module.exports = function(server) {
  server
    .get('/', require('./home'))
    .map('/detroit2013', detroit2013);
};
