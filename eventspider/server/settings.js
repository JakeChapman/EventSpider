if (Meteor.isServer) {
  process.env.MONGO_URL = "mongodb://adminDev:sekret@candidate.51.mongolayer.com:10821/EventSpider";
  //var mongo = Meteor.settings.MONGO_URL;
  //process.env.MONGO_URL = mongo;
  console.log("MONGO URL is: " + process.env.MONGO_URL);
}
