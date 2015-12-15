if (Meteor.isClient) {
  Template.register.events({

    'submit #register-form' : function(e,t) {
      e.preventDefault();
      var fname = t.find('#fname').value;
      var lname = t.find('#lname').value;
      var email = t.find('#email').value;
      var password = t.find('#password').value;

      //Trim and Validate User fields
      email = trimInput(email);
      console.log("REGISTER CLICK");
      if($('#confirmMatch-password').length > 0 && $('#confirmMatch-email').length > 0){
        Accounts.createUser({fname: fname, lname: lname, email: email, password: password}, function(err){
          if(err){
            //Inform user that account creation failed
            Notifications.warn('Account Creation Failed', 'Your account obvisouly sucked');
          }
          else {
            //User account creation has succedded and you can move on
            console.log("success");
            Router.go('/schools');
          }
        });
      }
      else {
          //Build Error Message
          if(($('#confirmMatch-password').length < 1))
          {
            failedValidation('Password Field does not match');
          }
          if(($('#confirmMatch-email').length  < 1))
          {
            failedValidation('Email Field does not match');
          }
          if($('#fname').val() === "")
          {
            failedValidation('Please enter a first name');
          }
          if($('#lname').val() === "")
          {
            failedValidation('Please enter a last name');
          }

      }
      return false;
    },

    'keyup #confirm-password' : function(e,t ) {
        var password = t.find('#password').value;
        var confirm = t.find('#confirm-password').value;

        $('#confirmWrong-password').remove();
        $('#confirmMatch-password').remove();

        if (confirm != password) {
          $('#confirm-password').after('<i id="confirmWrong-password" class="zmdi zmdi-alert-triangle zmdi-hc-2x"></i>');
        }
        else {
          $('#confirm-password').after('<i id="confirmMatch-password" class="zmdi zmdi-shield-check zmdi-hc-2x"></i>');
        }
    },

    'keyup #confirm-email' : function(e,t ) {
        var email = t.find('#email').value;
        var confirm = t.find('#confirm-email').value;

        //Trim fields
        email = trimInput(email);
        confirm = trimInput(confirm);

        $('#confirmWrong-email').remove();
        $('#confirmMatch-email').remove();

        if (confirm != email) {
          $('#confirm-email').after('<i id="confirmWrong-email" class="zmdi zmdi-alert-triangle zmdi-hc-2x"></i>');
        }
        else {
          $('#confirm-email').after('<i id="confirmMatch-email" class="zmdi zmdi-shield-check zmdi-hc-2x"></i>');
        }
    }

  });
}

var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var failedValidation = function(message){
  Notifications.warn("Validation Failed", message);
};
