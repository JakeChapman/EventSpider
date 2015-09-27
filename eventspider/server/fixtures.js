if (Events.find().count() === 0) {
  Events.insert({
    title: 'NKU Basketball',
    url: 'http://nku.edu'
  });

  Events.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });

  Events.insert({
    title: 'Robotics Meeting',
    url: 'http://robots.com'
    });
}

if (Schools.find().count() === 0) {
  Schools.insert({
    title: 'Northern Kentucky University',
    url: 'http://nku.edu'
  });

  Schools.insert({
    title: 'Xavier University',
    url: 'http://xavier.edu'
  });

  Schools.insert({
    title: 'Thomas More College',
    url: 'http://thomasmore.edu'
  });
}
