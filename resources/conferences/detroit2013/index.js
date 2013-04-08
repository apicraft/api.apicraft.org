var questions = require('./questions');

module.exports = function(server) {
  server
    .get('/', require('./home'))
    .get('/agenda', require('./agenda'))
    .get('/attendees', require('./attendees'))
    .get('/guidelines', require('./guidelines'))
    .get('/hotels', require('./hotels'))
    .get('/sessions', require('./sessions'))
    .get('/tickets', require('./tickets'))
    .get('/places', require('./places'))
    .get('/questions', questions.get)
    .post('/questions', questions.post);
};
