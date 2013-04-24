var crypto = require('crypto');
var Eventbrite = require('eventbrite');

module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
    var options = {
      app_key: env.config.eventbriteAppKey,
      user_key: env.config.eventbriteUserKey
    };

    var client = Eventbrite(options);

    client.event_list_attendees({ id: env.config.eventbriteEventId }, function(err, data) {
      var body = { attendees: [], links: [] };

      data.attendees.forEach(function(attendee) {
        attendee = attendee.attendee;
        console.log(attendee.answers);
        var a = {
          firstName: attendee.first_name,
          lastName: attendee.last_name 
        };

        if (attendee.answers[1]) {
          var githubId = attendee.answers[1].answer.answer_text;
          if (githubId) {
            a.github = 'https://github.com/' + githubId;
          }
        }

        if (attendee.answers[2]) {
          var twitterId = attendee.answers[2].answer.answer_text;
          if (twitterId) {
            a.twitter = 'https://twitter.com/' + twitterId;
          };
        }

        var hash = crypto.createHash('md5');
        hash.update(attendee.email);

        var gravatarUrl = 'http://gravatar.com/avatar/' + hash.digest('hex');

        a.avatar = gravatarUrl;
        body.attendees.push(a);
      });

      body.links = [
        { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
        { rel: 'index', href: env.helpers.uri('/conferences/') + env.config.location }
      ];

      env.response.body = body;
      next(env);
    });

  });
};
