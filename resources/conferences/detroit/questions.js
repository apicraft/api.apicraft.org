var querystring = require('querystring');
var msgpack = require('msgpack-js');
var helpers = require('../../../helpers');

exports.get = function(handle) {
  handle('request', function(env, next) {
    var parts = env.request.url.split('/');
    var last = parts[parts.length - 1];

    if (last === 'questions') {
      next(env);
    } else {
      env.medea.get('questions:' + last, function(err, val) {
        if (err) {
          env.response.statusCode = 500;
          next(env);
          return;
        }
        if (!val) {
          env.response.statusCode = 404;
          next(env);
          return;
        }
        console.log(val);
        env.response.statusCode = 200;
        env.response.body = msgpack.decode(val);
        next(env);
      });
    }
  });
};

exports.post = function(handle) {
  handle('request', function(env, next) {
    env.request.getBody(function(err, body) {
      if (err) {
        env.response.statusCode = 400;
        next(env);
        return;
      }

      var b = querystring.parse(body.toString());

      env.medea.get('questions:list', function(err, val) {
        if (err) {
          env.response.statusCode = 500;
          next(env);
          return;
        }

        var questions;
        if (!val) {
          questions = [];
        } else {
          questions = msgpack.decode(val);
        }

        var qLen = Object.keys(questions).length + 1;

        var q = { id: qLen, question: b, status: 'new' };

        questions.push('questions:' + qLen);

        var key = 'questions:' + qLen;

        env.medea.put(key, msgpack.encode(q), function(err) {
          env.medea.put('questions:list', msgpack.encode(questions), function(err) {
            env.response.statusCode = 201;
            env.response.setHeader('Location', helpers.uri('/conferences/detroit/questions/' + qLen));

            next(env);
          });
        });
      });
    });
  });
};
