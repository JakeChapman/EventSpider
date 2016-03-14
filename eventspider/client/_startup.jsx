if (Meteor.isClient) {

  document.getElementsByTagName("head")[0].innerHTML += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
  document.getElementsByTagName("head")[0].innerHTML += "<script type=\"text/javascript\" src=\"libs/png_support/zlib.js\"></script>\n" +
      "<script type=\"text/javascript\" src=\"libs/png_support/png.js\"></script>\n" +
      "<script type=\"text/javascript\" src=\"jspdf.plugin.addimage.js\"></script>\n" +
      "<script type=\"text/javascript\" src=\"jspdf.plugin.png_support.js\"></script>\n" +
      "<script type=\"text/javascript\" src=\"jspdf.js\"></script>";
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
