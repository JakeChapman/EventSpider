Template.nav.events({
  'click #navBtn' : function(e) {
    e.preventDefault();
    //alert("we made it bruh");
    $("#wrapper").toggleClass("toggled");
    //$("#navPanel").toggle("slide", { direction: "left" }, 500);
  }
});
