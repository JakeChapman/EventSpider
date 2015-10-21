/*Router.configure({
  layoutTemplate:'layout'
});*/
Router.route('/', function() {
  this.render('login');
});
Router.route('/masterCalendar', function(){
  this.render('masterCalendar');
  this.layout('layout');
});
Router.route('/eventsList', function(){
  this.render('eventsList', {
    data: function () {return Events.find()}
  });
  this.layout('layout');
});
Router.route('/event/:_id', function(){
  this.render('event', {
    data: function () {
      return Events.findOne({_id: this.params._id});
    }
  });
  this.layout('layout');
});
Router.route('/schools', function(){
  this.render('schoolList',{
    data: function() {
      return Schools.find()}
  });
  this.layout('layout');
});
Router.route('/topics', function(){
  this.render('topics');
  this.layout('layout');
});
Router.route('/register', function(){
  this.render('register');
})
