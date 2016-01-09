Footer = React.createClass({
  getInitialState() {
    return {isOpen: false}
  },
  propTypes: {
    bgColor: React.PropTypes.string.isRequired,
    fgColor: React.PropTypes.string.isRequired
  },

  selectAddType(e) {
    this.setState({
      isOpen: !this.state.isOpen
    })
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
        <div className="options">
          <AddMenu isOpen={this.state.isOpen}/>
        </div>
        <nav className="navbar navbar-default navbar-fixed-bottom" id='footer' role="navigation" style={divStyle}>
          <div className="glyphicon glyphicon-menu-hamburger navBtn" onClick={this.navClick}></div>
          <div className="glyphicon glyphicon-plus" id="addBtn" onClick={this.selectAddType}></div>
        </nav>
      </div>
    )
  }
});

AddMenu = React.createClass({
  getDefaultProps() {
    return {isOpen: false}
  },

  render() {
    if (this.props.isOpen) {
      return <ul>
          <a href="#">Add Org</a>
          <a href="#">Add Event</a>
      </ul>
    }
    return null;
  }
});
