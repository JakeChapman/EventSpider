Router.configure({
  layoutTemplate:'layout'
});
Router.map(function () {
  this.route('masterCalendar', {
    path: '/',  //overrides the default '/home'
  });
  this.route('eventsList', {
    path: '/events',
    data: function () {return Events.find()}
  });
  this.route('event', {
    path: '/event/:_id',
    data: function () {return Events.findOne({_id: this.params._id})},
    template: 'fullEvent'
  });
  this.route('schoolList', {
    path: '/schools',
    data: function() {return Schools.find()}
  });
});
