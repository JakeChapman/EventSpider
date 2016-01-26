if (Meteor.isServer) {

  //    console.log(process.env.MONGO_URL);
  //    console.log("Publishing Data");

  Meteor.publish('events', function() {
    //console.log("Number of Documents on Server: " + Questions.find().count());
    events = Events.find({});

    if (events) {
      return events;
    }

    return this.ready();
  });

  Meteor.publish('event', function(key) {
    //console.log("Number of Documents on Server: " + Questions.find().count());
    event = Events.find({title: key});

    console.log(key);
    if (event) {
      return event;
    }

    return this.ready();
  });

  console.log("Publishing Data: Events done");

  Meteor.publish('colleges', function() {
    colleges = Colleges.find({});

    console.log("Number of Colleges: " + colleges.count());

    if (colleges) {
      return colleges;
    }

    return this.ready();
  });

  console.log("Publishing Data: Events, Colleges done--something");

  Meteor.publish('organizations', function() {
    console.log("Finding orgs");
    organizations = Organizations.find({});

    console.log("Number of organizations: " + organizations.count());

    if (organizations) {
      return organizations;
    }

    return this.ready();
  });

  Meteor.publish('organization', function(key) {

    console.log(key);
    organization = Organizations.find({name: key});

    console.log("Number of organization: " + organization.count());

    if (organization) {
      return organization;
    }

    return this.ready();
  });
}
