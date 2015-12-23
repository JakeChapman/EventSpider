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

    Meteor.publish('event', function(name) {
      //console.log("Number of Documents on Server: " + Questions.find().count());
      event = Events.find({name: name});
      console.log(event.name)
      if( event ){
          return event;
      }

      return this.ready();
    });

    console.log("Publishing Data: Events done");

    Meteor.publish('colleges',function(){
      colleges = Colleges.find({});

      console.log("Number of Events: " +  colleges.find().count());

      if( colleges ){
        return colleges;
      }

      return this.ready();
>>>>>>> 3c5da03db94d1c2de16d1594b803b0f9281ee9e1
    });

    console.log("Publishing Data: Events, Colleges done");
}
