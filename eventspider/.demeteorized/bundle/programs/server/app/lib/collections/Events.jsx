(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/Events.jsx                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Events = new Mongo.Collection("Events");                               // 1
                                                                       //
Meteor.methods({                                                       // 5
  addEvent: function (event) {                                         // 6
                                                                       //
    if (!Meteor.userId()) {                                            // 8
      throw new Meteor.Error("not-authorized");                        // 9
    }                                                                  //
                                                                       //
    Events.insert({                                                    // 12
      title: event.title,                                              // 13
      description: event.description,                                  // 14
      location: event.location,                                        // 15
      tags: event.tags,                                                // 16
      categories: event.categories,                                    // 17
      date: event.date,                                                // 18
      start_time: event.start_time,                                    // 19
      end_time: event.end_time,                                        // 20
      on_campus: event.on_campus,                                      // 21
      created_on: new Date(),                                          // 22
      created_by: Meteor.userId()                                      // 23
    });                                                                //
  }                                                                    //
});                                                                    //
                                                                       //
Events.helpers({});                                                    // 29
                                                                       //
EventSchema = new SimpleSchema({});                                    // 32
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=Events.jsx.map
