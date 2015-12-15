/*Router.configure({
  layoutTemplate:'layout'
});*/
var requireLogin = function() {
  if (!Meteor.user()) {
    //Get All events
    // add subscription to wait list
    // this.wait(Meteor.subscribe('events'));
    // this.wait(Meteor.subscribe('colleges'));
    // If user is not logged in render landingpage
    this.render('login');
  } else {
    //if user is logged in render whatever route was requested
    this.next();
  }
};

// Before any routing run the requireLogin function.
// Except in the case of "landingpage".
// Note that you can add more pages in the exceptions if you want. (e.g. About, Faq, contact...)
Router.onBeforeAction(requireLogin, {
  except: ['login', 'register']
});


Router.route('/login', function() {
  this.render('login');
});
Router.route('/', function() {
  //this.wait(Meteor.subscribe('events'));
  //this.wait(Meteor.subscribe('colleges'));
  // If user is not logged in render landingpage
  //if(this.ready()){
  this.render('masterCalendar');
  this.layout('layout');
  //  }else {
  //    this.render('loading');
  //  }
}, {
  name: 'masterCalendar'
});
Router.route('/eventsList', function() {
  this.render('eventsList', {
    data: function() {
      return Events.find();
    }
  });
  this.layout('layout');
});
Router.route('/event/:_id', function() {
  this.render('event', {
    data: function() {
      return Events.findOne({
        _id: this.params._id
      });
    }
  });
  this.layout('layout');
});
Router.route('/schools', function() {
  this.wait(Meteor.subscribe('colleges'));

  if (this.ready()) {
    this.render('schoolList');
    this.layout('layout');
  } else {
    this.render('Loading');
  }
});
Router.route('/topics', function() {
  this.render('topics');
  this.layout('layout');
});
Router.route('/register', function() {
  this.render('register');
});
