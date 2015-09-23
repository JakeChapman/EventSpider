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
