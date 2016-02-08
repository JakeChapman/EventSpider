if (Meteor.isClient) {

  document.getElementsByTagName("head")[0].innerHTML += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";

  // This code is executed on the client only
  Accounts.config({
    sendVerificationEmail: true, forbidClientAccountCreation: true,
    //  restrictCreationByEmailDomain: "school.edu",
    //loginExpirationDays: 30,
    //oauthSecretKey: "wgporjigrpqgdfg",
  });
  Accounts.ui.config({requestPermissions: {}, requestOfflineToken: {}, passwordSignupFields: "EMAIL_ONLY"});

  Meteor.startup(function() {
    // Use Meteor.startup to render the component after the page is ready
    //React.render(<App />, document.getElementById("render-target"));
  });
}
