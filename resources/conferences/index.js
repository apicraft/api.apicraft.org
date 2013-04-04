var detroit = require('./detroit');

module.exports = function(server) {
  server
    .get('/', require('./home'))
    .map('/detroit', detroit);
};
