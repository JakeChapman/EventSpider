Schools = new Meteor.Collection('schools');

if (Meteor.isServer)
{
  Meteor.startup(function ()
  {
    if (! Schools.findOne())
    {
      var schools =
      [
        {
          title: 'Northern Kentucky University',
          url: 'http://nku.edu'
        },
        {
          title: 'Xavier University',
          url: 'http://xavier.edu'
        },
        {
          title: 'Thomas More College',
          url: 'http://thomasmore.edu'
        }
      ];
      schools.forEach(function (event) {
        Schools.insert(event);
      })
    }
  });
}
