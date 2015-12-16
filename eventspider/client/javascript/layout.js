Template.nav.events({
  'click #navBtn' : function(e, t) {
    e.preventDefault();
    //alert("we made it bruh");
    $("#wrapper").toggleClass("toggled");
    //document.getElementById('wrapper').toggleClass("toggled");
    //$("#navPanel").toggle("slide", { direction: "left" }, 500);
  }
});

//Collections Listed Below
console.log("HERE IN THE STUFF BRO");
Events = new Mongo.Collection('Events');
Colleges = new Mongo.Collection('Colleges');
Schools = new Mongo.Collection('Schools');
