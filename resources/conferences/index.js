var detroit = require('./detroit');

exports.home = require('./home');
exports.detroit = function(server) {
  server
    .get('/', detroit.home)
    .get('/attendees', detroit.attendees)
    .get('/hotels', detroit.hotels)
    .get('/sessions', detroit.sessions)
    .get('/tickets', detroit.tickets)
    .get('/places', detroit.places)
};
