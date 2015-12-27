Header = React.createClass({
  propTypes: {
    school: React.PropTypes.string.isRequired
  },
  render(){
    return   <div className="navbar navbar-default navbar-fixed-top" role="navigation" id="nav-header">
    <div className="container">
      <h3 id="mainHeader">{this.props.school}</h3>
    </div>
  </div>
  }
});
