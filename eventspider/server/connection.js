if (Meteor.isServer) {

  Meteor.startup(function() {

    Events = new Mongo.Collection("Events");
    Colleges = new Mongo.Collection("Colleges");
    Schools = new Mongo.Collection("Schools");

    Meteor.publish('events', function() {
      //console.log("Number of Documents on Server: " + Questions.find().count());
      console.log("Number of Events: " +  Events.find().count());
      return Events.find();
    });

    Meteor.publish('colleges',function(){
      console.log("Number of Colleges: " + Colleges.find().count());
      return Colleges.find();
    });

    Meteor.publish('schools', function(){
      console.log("Number of Schools: " + Schools.find().count());
      return Schools.find();
    });
  });
}
