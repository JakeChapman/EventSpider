Template.schoolList.helpers({
  schools: function()
  {
    console.log("Finding Schools: " + Colleges.find().count());
    return Colleges.find().fetch();
  }
});
