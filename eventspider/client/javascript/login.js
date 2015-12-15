Template.login.events({

  'submit form': function(e, t) {
    e.preventDefault();
    //retrieve the input field values
    var email = t.find('#userEmail').value;
    var password = t.find('#userPassword').value;

    //Trim and validate your fields here....
    email = trimInput(email);
    console.log("Email: " + email);
    console.log("Password: " + password);
    Meteor.loginWithPassword(email, password, function(err) {
      if (!err) {
        console.log("success");
        Router.go('/');
      } else {
        console.log("error");
        Notifications.warn('Login Failed', err);
      }
    });
  },

  'click #newUser': function(e, t) {
    console.log("going to registration");
    Router.go('/register');
  },

  'click #google': function(e, t) {
    e.preventDefault();
    console.log("CLICK");
  }
});

var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var isValidPassword = function(val) {

};
