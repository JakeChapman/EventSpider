Events = new Meteor.Collection('events');

if (Meteor.isServer)
{
  Meteor.startup(function ()
  {
    if (! Events.findOne())
    {
      var events =
      [
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
      events.forEach(function (event) {
        Events.insert(event);
      })
    }
  });
}
