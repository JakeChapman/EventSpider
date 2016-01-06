//Collections
Events = new Mongo.Collection("Events");
Colleges = new Mongo.Collection("Colleges");

if (Meteor.isServer) {

//    console.log(process.env.MONGO_URL);
//    console.log("Publishing Data");

    Meteor.publish('events', function() {
      //console.log("Number of Documents on Server: " + Questions.find().count());
      events = Events.find({});

      if( events ){
          return events;
      }

      return this.ready();
    });

    Meteor.publish('event', function(key) {
      //console.log("Number of Documents on Server: " + Questions.find().count());
      event = Events.find({title: key});
      if( event ){
          return event;
      }

      return this.ready();
    });

    console.log("Publishing Data: Events done");

    Meteor.publish('colleges',function(){
      colleges = Colleges.find({});

      console.log("Number of Colleges: " +  colleges.count());

      if( colleges ){
        return colleges;
      }

      return this.ready();
    });

    console.log("Publishing Data: Events, Colleges done");
  });
}
