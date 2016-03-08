Events = new Mongo.Collection("Events");



Meteor.methods({
  "Event.create": function(event) {

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

Events.helpers({});


EventSchema = new SimpleSchema({});
