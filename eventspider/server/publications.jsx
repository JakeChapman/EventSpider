if (Meteor.isServer) {

  //    console.log(process.env.MONGO_URL);
  //    console.log("Publishing Data");

  Meteor.publish('events', function() {
    //console.log("Number of Documents on Server: " + Questions.find().count());
    return Events.find({});
  });

  Meteor.publish('event', function(key) {
    //console.log("Number of Documents on Server: " + Questions.find().count());
    return Events.find({title: key});
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

  Meteor.methods({
      //Generate PDF
      'createPDF': function(eventId){
          var doc = new PDFDocument({size: 'A4', margin: 50});
          doc.image('/eventCode.jpeg', 10, 10, {height: 75});
          doc.fontSize(12);
          doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200});

      }



    });
}
