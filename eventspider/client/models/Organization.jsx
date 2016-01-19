Org = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    descrip: React.PropTypes.string,
    category: React.PropTypes.string,
    link: React.PropTypes.string,
    isSelected: React.PropTypes.bool
  },

  expandOrg(e){
    e.preventDefault();
    $(".orgs").transition("fade");
    FlowRouter.go('/myOrg/' + this.props.name);
  },

  render() {
    if(this.props.isSelected){
    return <div className="card full">
      <div id="org-picture">
        <img src="got.jpg" height="50px" width="50px"/>
      </div>
      <div className="org-name" onClick={this.orgClick}>
        {this.props.name}
      </div>
    </div>
  } else {
      return <div className="card" onClick={this.expandOrg}>
        <div id="org-picture">
          <img src="got.jpg" height="50px" width="50px"/>
        </div>
        <div className="org-name" onClick={this.orgClick}>
          {this.props.name}
        </div>
      </div>
    }
  }
});
