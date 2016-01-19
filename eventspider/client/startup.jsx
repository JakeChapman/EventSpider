//Collections
Events = new Mongo.Collection("Events");
Colleges = new Mongo.Collection("Colleges");
Organizations = new Mongo.Collection("Organizations");

if (Meteor.isClient) {
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

Meteor.methods({
  addEvent: function(event) {

    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Events.insert({
      title: event.title,
      description: event.description,
      location: event.location,
      tags: event.tags,
      categories: event.categories,
      date: event.date,
      start_time: event.start_time,
      end_time: event.end_time,
      on_campus: event.on_campus,
      created_on: new Date(),
      created_by: Meteor.userId()
    });

  }
});
