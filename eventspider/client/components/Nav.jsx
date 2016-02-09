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
        <a href='/'>Event Feed</a>
        <a id="search-feed">Org/Event Seach</a>
        <a href='/myEvents'>Saved Events</a>
        <a href='/account' id="accountSection">My Profile</a>
        <a href='/points'>Points & Rewards</a>
        <a href='/settings'>Settings</a>
        <a href='/qrCode'>Qr Code</a>
        <a href='/myOrg' onClick={this.closeNav}>My Organizations</a>
      </div>
    </div>
  }
});
