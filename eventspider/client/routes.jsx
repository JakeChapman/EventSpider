/*Router.configure({
  layoutTemplate:'layout'
});*/
/*
Router.route('/quiz',function(){
  // add subscription to wait list
  this.wait(Meteor.subscribe('questions'));
  this.wait(Meteor.subscribe('history'));

  if(this.ready()){
    this.render('quiz');
    this.layout('layout');
  }
});
Router.route('/', function() {
  this.render('login');
});
Router.route('/masterCalendar', function(){
  this.render('masterCalendar');
  this.layout('layout');
});
Router.route('/eventsList', function(){
  //add subscription to wait list
  this.wait(Meteor.subscribe('events'));

  if(this.ready()){
    this.render('eventsList');
    this.layout("layout");
  }
});

Router.route('/topics', function(){
  this.render('topics');
  this.layout('layout');
});
Router.route('/register', function(){
  this.render('register');
});
*/

// Flow Router here down
FlowRouter.route('/', {
  action: function(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content: <Login />
    });
  }
});
