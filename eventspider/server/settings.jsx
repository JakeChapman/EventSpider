//Collections
Events = new Mongo.Collection("Events");
Colleges = new Mongo.Collection("colleges");

if (Meteor.isServer) {

    console.log(process.env.MONGO_URL);
    console.log("Publishing Data");

    Meteor.publish('events', function() {
      //console.log("Number of Documents on Server: " + Questions.find().count());
      console.log("Number of Events: " +  Events.find().count());
      events = Events.find({});

      if( events ){
          return events;
      }

      return this.ready();
    });

    console.log("Publishing Data: Events done");

    Meteor.publish('colleges',function(){
      console.log("Number of Colleges: " + Colleges.find().count());
      return Colleges.find();
    });

    console.log("Publishing Data: Events, Colleges done");
}
