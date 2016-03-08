if (Meteor.isServer) {

  //    console.log(process.env.MONGO_URL);
  //    console.log("Publishing Data");

    Meteor.publish('categories', function() {
        //console.log("Number of Documents on Server: " + Questions.find().count());
        return Categories.find({});
    });

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
    return Organizations.find({});
    });

    Meteor.publish('organization', function(key) {
    return Organizations.find({name: key});
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
