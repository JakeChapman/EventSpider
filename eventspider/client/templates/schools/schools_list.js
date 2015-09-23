Template.schoolList.helpers({
  schools: function()
  {
    return School.find();
  }
});
