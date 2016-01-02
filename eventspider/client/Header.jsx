Header = React.createClass({
  propTypes: {
    school: React.PropTypes.string.isRequired,
    bgColor: React.PropTypes.string.isRequired,
    fgColor: React.PropTypes.string.isRequired
  },

  render() {

    let divStyle = {
      backgroundColor: this.props.bgColor,
      color: this.props.fgColor
    }

    return <div className="navbar navbar-default navbar-fixed-top" role="navigation" id="nav-header" style={divStyle}>
      <div className="container">
        <h3 id="mainHeader">{this.props.school}</h3>
      </div>
    </div>
  }
});
