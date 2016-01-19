Nav = React.createClass({
  propTpes: {
    userRole: React.PropTypes.string.isRequired
  },

  componentDidMount() {
    console.log("User Role: " + this.props.userRole);
    if (this.props.userRole === "OrgOwner") {
      $("<a href='/myOrg' onClick={this.closeNav}>My Organizations</a>").insertAfter("#accountSection");
    }
  },

  closeNav(){
    $(".wrapper").toggleClass("toggled");
  },

  render() {
    return <div id="sidebar-nav">
      <div id="sidebar-profile">
        <div id="profile-picture">
          <img src="got.jpg" height="75px" width="75px"/>
        </div>
        <div id="profile-info">
          <p id="p-info">John Smith</p>
          <p id="p-info">Psychology</p>
        </div>
      </div>
      <div id="sidebar-links" onClick={this.closeNav}>
        <a href='/feed'>Event Feed</a>
        <a href='/feed'>Org/Event Seach</a>
        <a href='/feed'>Saved Events</a>
        <a href='/feed' id="accountSection">My Profile</a>
        <a href='/feed'>Points & Rewards</a>
        <a href='/feed'>Settings</a>
      </div>
    </div>
  }
});
