Template.login.events({

  /*'submit #loginform' : function(e, t){
      e.preventDefault();
      //retrieve the input field values
      var email = t.find('#userEmail').value,
      password = t.find('#userPassword').value;

      //Trim and validate your fields here....
      var email = trimInput(email);
      alert(email);
      //If validation passes, supply the appropriate fields to the
      //Meteor.loginWithPassword() function
      Meteor.loginWithPassword(email, password, function(err){
        if(err){
          //the user might not have been found, or their password
          // could be incorrect. Inform the user that their
          //login attempt has failed.
          Router.go('masterCalendar');
        }
        else {
              //the user has been logged in
        }
      });
        return false;
      }
*/
      'click #newUser': function(e, t){
        e.preventDefault();
        Router.go('register');
      }
});

var trimInput = function(val){
  return val.replace(/^\s*|\s*$/g, "");
}

var isValidPassword = function(val){

}
