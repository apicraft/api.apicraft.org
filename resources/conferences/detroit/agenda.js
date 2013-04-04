var agenda = require('./agenda_data');

module.exports = function(handle) {
  handle('request', function(env, next) {
    env.response.statusCode = 200;
    env.response.body = agenda;

    next(env);
  });
};
