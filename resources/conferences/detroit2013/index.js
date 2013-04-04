var home = require('./home');
var agenda = require('./agenda');
var attendees = require('./attendees');
var hotels = require('./hotels');
var places = require('./places');
var sessions = require('./sessions');
var tickets = require('./tickets');
var questions = require('./questions');

module.exports = function(server) {
  server
    .get('/', home)
    .get('/agenda', agenda)
    .get('/attendees', attendees)
    .get('/hotels', hotels)
    .get('/sessions', sessions)
    .get('/tickets', tickets)
    .get('/places', places)
    .get('/questions', questions.get)
    .post('/questions', questions.post);
};
