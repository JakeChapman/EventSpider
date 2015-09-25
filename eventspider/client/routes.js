Router.configure({
  layoutTemplate:'layout'
});
Router.map(function () {
  this.route('login', {
    path: '/',  //overrides the default '/home'
  });
  this.route('masterCalendar', {
    path: '/masterCalendar'
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
});
