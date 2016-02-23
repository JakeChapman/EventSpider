(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publications.jsx                                             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isServer) {                                                 // 1
                                                                       //
  //    console.log(process.env.MONGO_URL);                            //
  //    console.log("Publishing Data");                                //
                                                                       //
  Meteor.publish('events', function () {                               // 6
    //console.log("Number of Documents on Server: " + Questions.find().count());
    events = Events.find({});                                          // 8
                                                                       //
    if (events) {                                                      // 10
      return events;                                                   // 11
    }                                                                  //
                                                                       //
    return this.ready();                                               // 14
  });                                                                  //
                                                                       //
  Meteor.publish('event', function (key) {                             // 17
    //console.log("Number of Documents on Server: " + Questions.find().count());
    event = Events.find({ title: key });                               // 19
                                                                       //
    console.log(key);                                                  // 21
    if (event) {                                                       // 22
      return event;                                                    // 23
    }                                                                  //
                                                                       //
    return this.ready();                                               // 26
  });                                                                  //
                                                                       //
  console.log("Publishing Data: Events done");                         // 29
                                                                       //
  Meteor.publish('colleges', function () {                             // 31
    colleges = Colleges.find({});                                      // 32
                                                                       //
    console.log("Number of Colleges: " + colleges.count());            // 34
                                                                       //
    if (colleges) {                                                    // 36
      return colleges;                                                 // 37
    }                                                                  //
                                                                       //
    return this.ready();                                               // 40
  });                                                                  //
                                                                       //
  console.log("Publishing Data: Events, Colleges done--something");    // 43
                                                                       //
  Meteor.publish('organizations', function () {                        // 45
    console.log("Finding orgs");                                       // 46
    organizations = Organizations.find({});                            // 47
                                                                       //
    console.log("Number of organizations: " + organizations.count());  // 49
                                                                       //
    if (organizations) {                                               // 51
      return organizations;                                            // 52
    }                                                                  //
                                                                       //
    return this.ready();                                               // 55
  });                                                                  //
                                                                       //
  Meteor.publish('organization', function (key) {                      // 58
                                                                       //
    console.log(key);                                                  // 60
    organization = Organizations.find({ name: key });                  // 61
                                                                       //
    console.log("Number of organization: " + organization.count());    // 63
                                                                       //
    if (organization) {                                                // 65
      return organization;                                             // 66
    }                                                                  //
                                                                       //
    return this.ready();                                               // 69
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=publications.jsx.map
