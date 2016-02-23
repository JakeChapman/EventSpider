Footer = React.createClass({
  getInitialState() {
    return {isOpen: false}
  },
  propTypes: {
    bgColor: React.PropTypes.string.isRequired,
    fgColor: React.PropTypes.string.isRequired
  },

  navClick(event) {
    event.preventDefault();
    $(".wrapper").toggleClass("toggled");
  },
  render() {
    let divStyle = {
      backgroundColor: this.props.bgColor,
      color: this.props.fgColor
    }
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-bottom" id='footer' role="navigation" style={divStyle}>
          <div className="glyphicon glyphicon-menu-hamburger navBtn" onClick={this.navClick}></div>
        </nav>
      </div>
    )
  }
});

