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
        var a = {
          firstName: attendee.first_name,
          lastName: attendee.last_name 
        };

        var githubId = attendee.answers[1].answer.answer_text;
        if (githubId) {
          a.github = 'https://github.com/' + githubId;
        }

        var twitterId = attendee.answers[2].answer.answer_text;
        if (twitterId) {
          a.twitter = 'https://twitter.com/' + twitterId;
        };

        body.attendees.push(a);
      });

      body.links = [
        { rel: 'self', href: env.helpers.uri('/conferences/detroit' + env.request.url) },
        { rel: 'index', href: env.helpers.uri('home') }
      ];

      env.response.body = body;
      next(env);
    });

  });
};
