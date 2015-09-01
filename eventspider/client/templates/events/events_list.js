var eventsData = [
  {
    title: 'NKU Basketball',
    url: 'http://nku.edu'
  },
  {
    title: 'Meteor',
    url: 'http://meteor.com'
  },
  {
    title: 'Robotics Meeting',
    url: 'http://robots.com'
  }
];

Template.eventsList.helpers({
  events: eventsData
});
