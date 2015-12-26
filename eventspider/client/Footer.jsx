Footer = React.createClass({
  navClick(event){
    event.preventDefault();
    $(".wrapper").toggleClass("toggled");
    $("#sidebar-wrapper").toggleClass("shadow");
  },
  render() {
    return <nav className="navbar navbar-default navbar-fixed-bottom" id='footer' role="navigation">
      <button type="button" className="btn btn-default navbar-btn glyphicon glyphicon-menu-hamburger" id="navBtn" onClick={this.navClick}>
      </button>
    </nav>
  }
});
