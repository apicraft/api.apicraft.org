var detroit2014 = require('./detroit2014');

module.exports = function(server) {
  server
    .get('/', require('./home'))
    .map('/detroit2014', detroit2014);
};
